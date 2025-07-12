import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

import spaceCommander from '@utils/space-commander';
import { defineReferencesCollection } from '@schemas/reference';

const tags = z.array(z.string()).optional();

const sections = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/sections' }),
  schema: ({ image }) =>
    z
      .object({
        abstract: z
          .string()
          .optional()
          .transform((str) => spaceCommander(str)),
        backgroundImageSrc: image().optional(),
        bibliography: z.string().optional(),
        excludeFromToc: z.boolean().optional().default(false),
        excludeFromTour: z.boolean().optional().default(false),
        language: z.enum(['de', 'en']).optional(),
        path: z.string().optional(),
        sectionClass: z.string().optional(),
        sectionNumber: z.string().optional(),
        sectionType: z.string().optional(), // part, spread, left, right
        subtitle: z
          .string()
          .optional()
          .transform((str) => spaceCommander(str)),
        supertitle: z
          .string()
          .optional()
          .transform((str) => spaceCommander(str)),
        tags,
        title__toc: z.string().optional(),
        title: z.string().transform((str) => spaceCommander(str)),
        tocIcon: z.string().optional(),
      })
      .strict(),
});

export const collections = {
  sections,
  references: defineReferencesCollection,
};
