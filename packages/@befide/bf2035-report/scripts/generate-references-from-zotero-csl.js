import { Cite, plugins } from '@citation-js/core';
import fg from 'fast-glob';
import { dump } from 'js-yaml';
import readYamlFile from 'read-yaml-file';
import * as url from 'url';

import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import { readFileSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const EXPORT_PATH = join(__dirname, '..', 'src', 'content', 'references');

const templateName = 'apa_7th_semantic';
const template = readFileSync(
  join(__dirname, templateName + '.csl'),
).toString();

const config = plugins.config.get('@csl');
config.templates.add(templateName, template);

const URL_REGEXP =
  /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:;%_+.~#?&/=]*))/;

const linkify = (str = '') => str.replace(URL_REGEXP, "<a href='$1'>LINK</a>");

const readCSLItems = (filePaths) =>
  filePaths.flatMap((filePath) => {
    if (extname(filePath) === '.json')
      return JSON.parse(readFileSync(filePath).toString());

    if (extname(filePath) === '.yaml') {
      return readYamlFile.sync(filePath).references;
    }

    return [];
  });

const generate = ({ globPattern, tagScoper }) => {
  const clsItems = readCSLItems(fg.sync(globPattern));
  const cite = Cite();

  const processCitation = (s = '') =>
    s
      .replaceAll('[[/]]', '</span>')
      .replace(/\[\[(.*?)\]\]/gm, "<span class='$1'>")
      // .replace("(", "")
      // .replace(")", "")
      .replaceAll('<div', '<span')
      .replaceAll('</div', '</span');

  const bibliography = clsItems.flatMap((cslItem) => {
    console.log(`process cslItem ${cslItem.id}.`);
    cite.set(cslItem);
    return {
      id: cslItem.id,
      cslItem,
      tags: cslItem.keyword
        ? cslItem.keyword.split(';').map((tag) => tagScoper(tag))
        : [],
      rendered: {
        bibliography: linkify(
          processCitation(
            cite.format('bibliography', {
              format: 'html',
              template: 'apa_7th_semantic',
              lang: 'de-DE',
            }),
          ),
        ),
        citation: processCitation(
          cite.format('citation', {
            format: 'html',
            template: 'apa_7th_semantic',
            lang: 'de-DE',
          }),
        ),
      },
      bibTex: cite.format('bibtex'),
    };
  });

  bibliography.forEach((bibliographyEntry) => {
    console.log(`wrote cslItem ${bibliographyEntry.cslItem.id}.`);
    writeFileSync(
      join(EXPORT_PATH, `${bibliographyEntry.cslItem.id}.md`),
      `---\n${dump(bibliographyEntry, { quotingType: '"' })}---\n`,
    );
  });

  console.log(`${bibliography.length} content items created. `);
};

generate({
  globPattern: '**.csl.json',
  tagScoper: (tag) => {
    return tag.replace('#bf2035/', 'bf2035:');

    if (tag.startsWith('#bf2035/')) {
      return tag.replace('#bf2035/', 'bf2035:');
    }

    return [];

    const split = tag.replace(/^#bf2035\//, '').split('::');
    return tag;

    // const issue = split.shift();

    const tags = [];
    tags.push({
      scope: 'collection.' + split.join('/'),
    });
    // ...split.map((collection) => "topic:" + issue + "/" + collection),
    // );

    return tags;
  },
});
