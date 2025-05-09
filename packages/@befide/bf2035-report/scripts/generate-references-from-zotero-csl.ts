import { Cite, plugins } from '@citation-js/core';
import fg from 'fast-glob';
import { dump } from 'js-yaml';

import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from 'console';

const templateName = 'apa_7th_semantic';
const template = readFileSync(
  join(__dirname, templateName + '.csl'),
).toString();

const config = plugins.config.get('@csl');
config.templates.add(templateName, template);

const URL_REGEXP =
  /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:;%_+.~#?&/=]*))/;

const linkify = (str = '') => str.replace(URL_REGEXP, "<a href='$1'>LINK</a>");

const readCSLItems = (fileNames: string[]) =>
  fileNames.flatMap((fileName) =>
    JSON.parse(readFileSync(fileName).toString()),
  );

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
    cite.set(cslItem);
    return {
      cslItem,
      tags: cslItem.keyword
        ? cslItem.keyword.split(';').filter((tag) => tag.startsWith('#bf2035/'))
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
    writeFileSync(
      join(
        'src',
        'content',
        'references',
        `${bibliographyEntry.cslItem.id}.md`,
      ),
      `---\n${dump(bibliographyEntry, { quotingType: '"' })}---\n`,
    );
  });

  console.log(`${bibliography.length} content items created. `);
};

generate({
  globPattern: '**.csl.json',
  tagScoper: (tag: string) => {
    if (tag.startsWith('#bf2035'))
      // return [{ tag: tag, scope: undefined }]
      return tag;

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
