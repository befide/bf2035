const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
import api from 'zotero-api-client';
import type { Item } from 'zotero-types';

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';
import type Facilities from './components/domain/Facilities.astro';

export const ThesesSchema = z.object({
  id: z.string(),

  author: z.object({
    familyName: z.string(),
    givenName: z.string(),
    gender: z.string().optional().nullable()
  }),
  year: z.number(),
  title: z.string(),
  language: z.enum(['en', 'de']),
  url: z.string().url().optional(),
  thesisType: z.string(),
  fulltextLink: z.string().url().optional(),
  doi: z.string().optional(),
  urn: z.string().optional(),
  isbn: z.string().optional(),
  abstract: z.string().optional().nullable(),
  publisher: z.string(),
  tags: z.array(z.string().optional()),
  degree: z.string().optional(),
  isA: reference('taxonomy').optional().nullable(),
  universityRef: reference('organizations').optional().nullable(),
  facilities: z.array(reference('facilities').optional().nullable())
});

export type Theses = z.infer<typeof ThesesSchema>;

export const defineThesesCollection = defineCollection({
  loader: async () => {
    const responsePages = [100, 200, 300];
    const items = await Promise.all(
      responsePages.flatMap(async (page) => {
        try {
          const response = await api
            .default('XDG2xtjGo4SXskg2lj1eC0DN', {
              start: page - 99,
              limit: 100
            })
            .library('group', 2427722)
            .items()
            .get();
          const data = await response.raw;
          return data;
        } catch (err) {
          console.error(`I'm down, this time. ${err}`);
        }
      })
    );

    const data = items.flat().map((item: Item) => {
      // console.log('\n\n');
      // console.log(JSON.stringify({ item }, null, 2));
      const dataItem: Theses = {
        id: item.key,
        title: item.data.title,
        language: item.data.language,
        abstract: item.data.abstractNote,
        thesisType: item.data.thesisType,
        year: Number(item.data.date?.substr(0, 4)),
        publisher: item.data.publisher || item.data.university,
        url: item.data.url,
        author: {
          familyName: item.data.creators[0]?.lastName,
          givenName: item.data.creators[0]?.firstName
        },
        tags: item.data.tags.map(({ tag }: { tag: String }) => tag),
        facilities: []
      };

      if (item.data.url?.startsWith('https://doi.org/')) {
        dataItem.doi = item.data.url.replace('https://doi.org/', '');
      }
      if (item.data.url?.startsWith('https://nbn-resolving.de/')) {
        dataItem.urn = item.data.url.replace('https://nbn-resolving.de/', '');
      }

      if (item.data.extra)
        item.data.extra.split('\n').forEach((extraLine: String) => {
          const splittedExtraLine = extraLine.split(/: /);
          if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0].toLowerCase() === 'doi'
          ) {
            dataItem.doi = splittedExtraLine[1];
          } else if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0].toLowerCase() === 'isbn'
          ) {
            dataItem.isbn = splittedExtraLine[1];
          } else if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0].toLowerCase() === 'fulltext-url' &&
            splittedExtraLine[1] !== 'none'
          ) {
            dataItem.fulltextLink = splittedExtraLine[1];
          } else {
            console.log({
              message: 'extra line not parsed',
              extraLine,
              id: item.key
            });
          }
        });

      dataItem.tags.forEach((tag: String) => {
        if (tag.startsWith('/information-content-entity/')) {
          dataItem.isARef = tag;
        }
        if (tag.startsWith('#befide/organization/')) {
          dataItem.universityRef = tag.replace('#befide/organization/', '');
        }
        if (tag.startsWith('/person/gender/')) {
          dataItem.author.gender = tag.replace('/person/gender/', '');
        }
        if (tag.startsWith('#befide/facility/')) {
          dataItem.facilities.push(tag.replace('#befide/facility/', ''));
        }
      });

      console.log(JSON.stringify({ item, dataItem }, null, 2));
      return dataItem;
    });

    return data;
  },
  schema: ThesesSchema
});
