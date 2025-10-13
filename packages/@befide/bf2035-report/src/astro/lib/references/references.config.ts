/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'node:fs';
import path from 'node:path';

import { defineCollection, reference, z } from 'astro:content';

const INPUT_FILEPATH = path.join('src', 'data', 'zotero', 'kfb_bf2035.json');

export const ReferenceZodSchema = z.object({
  id: z.string(),
  citationKey: z.string().optional(),
  creators: z.array(
    z.object({
      lastName: z.string().optional(),
      firstName: z.string().optional(),
      name: z.string().optional(),
    }),
  ),
  itemType: z.string(),
  year: z.number().optional(),
  title: z.string(),
  language: z.enum(['en', 'de', 'en-US']).optional(),
  //   url: z.string().url().optional(),
  url: z.string().optional(),
  isOpenAccess: z.boolean(),
  fulltextLink: z.string().url().optional(),
  doi: z.string().optional(),
  urn: z.string().optional(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  tags: z.array(z.string().optional()),

  organizationRefs: z.array(reference('organizations').optional().nullable()),
  facilityRefs: z.array(reference('facilities').optional().nullable()),
});

export type ReferenceSchema = z.infer<typeof ReferenceZodSchema>;

export const defineReferencesCollection = defineCollection({
  loader: async () => {
    const dataRaw = JSON.parse(fs.readFileSync(INPUT_FILEPATH).toString());

    return dataRaw
      .flat()
      .filter(
        (item: any) => item.data.itemType !== 'attachment',
        //  &&
        //   item.data.tags
        //     .map(({ tag }: { tag: string }) => tag)
        //     .indexOf('_used') > -1,
      )
      .map((item: any) => {
        const dataItem: ReferenceSchema = {
          id: item.key,
          isOpenAccess: false,

          title: item.data.title,
          itemType: item.data.itemType,
          language: item.data.language !== '' ? item.data.language : undefined,
          year: item.data.date
            ? Number((item.data.date as string)?.substring(0, 4))
            : undefined,
          publisher: item.data.publisher || item.data.university,
          url: item.data.url !== '' ? item.data.url : undefined,
          creators: item.data.creators,
          tags: item.data.tags.map(({ tag }: { tag: string }) => tag),
          organizationRefs: [],
          facilityRefs: [],
        };

        if (item.data.url?.startsWith('https://doi.org/')) {
          dataItem.doi = item.data.url.replace('https://doi.org/', '');
        }
        if (item.data.url?.startsWith('https://nbn-resolving.de/')) {
          dataItem.urn = item.data.url.replace('https://nbn-resolving.de/', '');
        }

        if (item.data.extra)
          item.data.extra.split('\n').forEach((extraLine: string) => {
            const splittedExtraLine = extraLine.split(/: /);
            if (
              splittedExtraLine.length == 2 &&
              splittedExtraLine[0] &&
              splittedExtraLine[0].toLowerCase() === 'doi'
            ) {
              dataItem.doi = splittedExtraLine[1];
            } else if (
              splittedExtraLine.length == 2 &&
              splittedExtraLine[0] &&
              splittedExtraLine[0].toLowerCase() === 'isbn'
            ) {
              dataItem.isbn = splittedExtraLine[1];
            } else if (
              splittedExtraLine.length == 2 &&
              splittedExtraLine[0] &&
              splittedExtraLine[0].toLowerCase() === 'citation key'
            ) {
              dataItem.citationKey = splittedExtraLine[1];
            } else if (
              splittedExtraLine.length == 2 &&
              splittedExtraLine[0] &&
              splittedExtraLine[0].toLowerCase() === 'fulltext-url' &&
              splittedExtraLine[1] !== 'none'
            ) {
              dataItem.fulltextLink = splittedExtraLine[1];
              dataItem.isOpenAccess = true;
            }
          });

        // dataItem.tags.forEach(async (tag = '') => {
        //   if (tag?.startsWith('#is-about/facility/:')) {
        //     dataItem.isAbout.facility__facilitiesId.push(
        //       tag.replace('#is-about/facility/:', ''),
        //     );
        //   }
        //   if (tag?.startsWith('#is-about/acceleration-process/:')) {
        //     dataItem.isAbout.accelerationProcess__taxonomyId.push(
        //       tag.replace('#is-about/acceleration-process/:', ''),
        //     );
        //   }
        // });
        dataItem.id = dataItem.citationKey;
        return dataItem;
      });
  },
  schema: ReferenceZodSchema,
});
