import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

import { csvFormat } from 'd3-dsv';

const theses = await getCollection('theses');

const csv = csvFormat(
  theses.map((d) => ({
    creator: d.data.author.familyName + ', ' + d.data.author.givenName,
    year: d.data.year,
    title: d.data.title,
    url: d.data.url,
    doi: d.data.doi,
    isbn: d.data.isbn,
    fulltextLink: d.data.fulltextLink,
    tags: d.data.tags,
    abstract: d.data.abstract
  }))
);

export const GET: APIRoute = () => {
  return new Response(csv, {
    headers: {
      'Content-Type': 'text; charset=utf-8'
    }
  });
};
