const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
import api from 'zotero-api-client';
import type { Item } from 'zotero-types';

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

export const ThesesSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number(),
  author: z.object({
    familyName: z.string(),
    givenName: z.string(),
    gender: z.string().default('male')
  }),
  tags: z.string().optional(),
  degree: z.string().optional(),
  type: reference('taxonomy').optional().nullable(),
  university: reference('formalOrganizations').optional().nullable(),
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
      const dataItem: Theses = {
        id: item.key,
        title: item.data.title,
        thesisType: item.data.thesisType,
        year: Number(item.data.date?.substr(0, 4)),
        facilities: [],
        author: {
          familyName: item.data.creators[0]?.lastName,
          givenName: item.data.creators[0]?.firstName
        }
      };

      item.data.tags.forEach(({ tag }: { tag: string }) => {
        if (tag.startsWith('#information-content-entity/')) {
          dataItem.type = tag.replace('#', '/');
        }
        if (tag.startsWith('#university')) {
          dataItem.university = tag.replace('#university', '');
        }
        if (tag.startsWith('#person/gender/')) {
          dataItem.author.gender = tag.replace('#person/gender/', '');
        }
        if (tag.startsWith('#facility/')) {
          dataItem.facilities.push(tag.replace('#facility', ''));
        }
      });

      return dataItem;
    });

    return data;
  },
  schema: ThesesSchema
});
