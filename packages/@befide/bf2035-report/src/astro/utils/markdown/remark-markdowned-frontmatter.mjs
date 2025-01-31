// @ts-nocheck
import removeMarkdown from 'remove-markdown';

import { renderInline } from './render';
import { traverse } from './traverse-object.mjs';

const md2html = async (obj = {}, path = '', value = '') => {
  const isBlock = path[path.length - 1].endsWith('mdb');
  const rendered = isBlock
    ? await renderInline(value)
    : await renderInline(value);

  const relativePropertyName = path.slice(-1)[0];

  const relativePropertyNameAsHtml = path
    .slice(-1)[0]
    .replace(/__mdb?/, '__html');
  obj[relativePropertyNameAsHtml] = rendered;
  delete obj[relativePropertyName];
};

export function markdownedFrontmatterPlugin() {
  // All remark and rehype plugins return a separate function
  return function (_, file) {
    const frontmatter = file.data.astro.frontmatter;

    if (!frontmatter.title__md) frontmatter.title__md = frontmatter.title;

    frontmatter.title = removeMarkdown(frontmatter.title);
    frontmatter.title.replaceAll(' @@ ', ' ').replaceAll(' @ ', ' ');

    traverse(frontmatter, md2html, [/__md/, /__mdb/]);
  };
}
