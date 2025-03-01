import fs from 'node:fs';
import path from 'node:path';
import type {Item} from 'zotero-types';
import {defineCollection} from 'astro:content';
import {z} from 'zod';

const INPUT_FILEPATH = path.join(
  'src',
  'data',
  'zotero',
  'kfb_bf2035_used.json'
);

export const ThesesSchema = z.object({
  id: z.string(),
  'citation-key': z.string(),

  author: z.array(
    z.union([
      z.object({ family: z.string(), given: z.string() }),
      z.object({ literal: z.string() })
    ])
  ),
  title: z.string(),
  issued: z.object({ 'date-parts': z.array(z.array(z.string())) }),
  DOI: z.string().optional().nullable(),
  language: z.string(),
  tags: z.array(z.string().optional())
});

export type Theses = z.infer<typeof ThesesSchema>;

export const defineThesesCollection = defineCollection({
  loader: async () => {
    const dataRaw = JSON.parse(fs.readFileSync(INPUT_FILEPATH).toString());

    const data = dataRaw.flat().map((item: Item) => {
      // console.log('\n\n');
      // console.log(JSON.stringify({ item }, null, 2));
      const dataItem: Theses = {
        id: item.key,
        title: item.data.title,
        language: item.data.language || 'en',
        year: Number(item.data.date?.substr(0, 4)),
        type: z.string(),
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
          } else if (splittedExtraLine[0].toLowerCase() === 'citation key') {} else {}
            console.log({
              message: 'extra line not parsed',
              extraLine
              // id: item.key
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

      // console.log(JSON.stringify({ item, dataItem }, null, 2));
      return dataItem;
    });

    return data;
  },
  schema: ThesesSchema
});
