import { defineCollection, z, type SchemaContext } from 'astro:content';
import { globWithParser } from '@lib/globWithParser.ts';

import spaceCommander from '@lib/space-commander.ts';
import { mergeDeep } from '@lib/mergeDeep.ts';

const SectionZodSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z
      .string()
      .max(60)
      .transform((str) => spaceCommander(str)),
    abstract: z
      .string()
      .optional()
      .transform((d) => spaceCommander(d)),
    sectionNumber: z.string().optional(),
    sectionDepth: z.number(),
    sectionNumbers: z.array(z.string()),
    excludeFromTour: z.boolean().default(false),

    sectionClass: z.string().optional(),
    backgroundImageSrc: image().optional(),

    //       .string()
    //       .optional()
    //       .transform((str) => spaceCommander(str)),
    //     // backgroundImageSrc: image().optional(),
    //     bibliography: z.string().optional(),
    //     excludeFromToc: z.boolean().optional().default(false),
    //     excludeFromTour: z.boolean().optional().default(false),
    sectionType: z.string().optional(), // part, spread, left, right
    subtitle: z
      .string()
      .optional()
      .transform((str) => spaceCommander(str)),
    supertitle: z
      .string()
      .optional()
      .transform((str) => spaceCommander(str)),
    //     tags,
    //     title__toc: z.string().optional(),
    //     title: z.string().transform((str) => spaceCommander(str)),
    //     tocIcon: z.string().optional(),
    // draft: z.boolean().default(false)
    // publishDate: z.coerce.date().optional(),
    // updatedDate: z.coerce.date().optional(),
    // tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
  });

export type SectionSchema = z.infer<typeof SectionZodSchema>;

// Define docs collection

export const defineSectionCollection = defineCollection({
  loader: globWithParser({
    pattern: '**/*.{md,mdx}',
    base: './src/content/sections',
    // @ts-ignore
    parser: (entry) => {
      const sectionNumbers = entry.data.sectionNumber
        ? (entry.data.sectionNumber as string).split('.')
        : [];
      const sectionDepth = sectionNumbers.length;

      const computedData = {
        sectionNumbers,
        sectionDepth,
        // slug,
      };
      console.log(computedData);
      return mergeDeep(entry, { data: computedData });
    },
  }),

  schema: SectionZodSchema,
});
