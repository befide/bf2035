const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data');

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

export const ThesesSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number(),
  author: z.string(),
  gender: z.string().default('male'),
  tags: z.string().optional(),
  degree: z.string().optional(),
  university: reference('formalOrganizations').optional().nullable(),
  facility: reference('facilities').optional().nullable()
});

export const defineThesesCollection = defineCollection({
  loader: () => {
    const input = fs
      .readFileSync(path.join(DATA_PATH, 'theses.csv'))
      .toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {
      console.log(d.tags.split(';'));
      d.tags.split(';').forEach((t) => {
        if (t.startsWith('#university')) {
          d.university = t.replace('#university', '');
          if (
            d.university === '/tu-berlin' ||
            d.university === '/btu-cottbus-senftenberg'
          )
            delete d.university;
        }
        if (t.startsWith('#gender')) {
          d.gender = t.replace('#gender', '');
        }
        if (t.startsWith('#facility')) {
          d.facility = t.replace('#facility', '');
        }
        if (t.startsWith('#degree')) {
          d.degree = t.replace('#degree', '');
        }
        {
          d.degree = 'dr.rer.nat';
        }
      });
    });
    return data;
  },
  schema: ThesesSchema
});

export type Theses = z.infer<typeof ThesesSchema>;
