import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

import spaceCommander from '@utils/space-commander';

const tags = z.array(z.string()).optional();

export const ScopedTag = z.object({
  scope: z.string().optional(),
  value: z.string(),
});
export const ScopedTags = z.array(ScopedTag).optional();

const organizations = defineCollection({
  loader: glob({
    pattern: '**/*.*',
    base: '/Users/dirk/Projekte/kunde-KfB/@befide/bf2035/packages/@befide/bf2035-community-inventory/03.output/inventory/organizations',
  }),
  schema: z.object({
    id: z.string(),
    befideInventoryOrganizationalLevelCategory: z.string(),
    befideOrganizationCategories: z.array(z.string()),
    homepage__de: z.string().nullable().optional(),
    homepage__en: z.string().nullable().optional(),
    label__de: z.string(),
    label__en: z.string().nullable().optional(),
    description__de: z.string().nullable().optional(),
    description__en: z.string().nullable().optional(),
    label__short: z.string().nullable().optional(),
    isPartOfCommunity: z.boolean(),
    location: z.object({
      city: z.string().nullable().optional(),
      country: z.string().nullable().optional().default('Germany'),
      lat: z.number().nullable().optional(),
      lng: z.number().nullable().optional(),
    }),
    peopleCount: z.object({
      uniqueProfessors: z.number(),
      uniqueSeniorResearchers: z.number(),
      uniquePostDocs: z.number(),
      uniquePhdStudents: z.number(),
      uniqueWorkingStudents_MSC: z.number(),
      uniqueWorkingStudents_BSC: z.number(),
    }),
    reviewedBy: z.string().nullable().optional(),
    parentPath: z.string().nullable().optional(),
    localName: z.string(),
  }),
});

const sections = defineCollection({
  loader: glob({ pattern: '**/*.*', base: './src/content/sections' }),
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

const references = defineCollection({
  loader: glob({ pattern: '**/*.*', base: './src/content/references' }),
  schema: z
    .object({
      id: z.string(),
      tags: z.array(z.string()),

      bibTex: z.string(),
      rendered: z.object({
        bibliography: z.string(),
        citation: z.string(),
      }),
      cslItem: z.object({
        type: z.enum([
          'article',
          'article-journal',
          'article-magazine',
          'article-newspaper',
          'bill',
          'book',
          'broadcast',
          'chapter',
          'classic',
          'collection',
          'dataset',
          'document',
          'entry',
          'entry-dictionary',
          'entry-encyclopedia',
          'event',
          'figure',
          'graphic',
          'hearing',
          'interview',
          'legal_case',
          'legislation',
          'manuscript',
          'map',
          'motion_picture',
          'musical_score',
          'pamphlet',
          'paper-conference',
          'patent',
          'performance',
          'periodical',
          'personal_communication',
          'post',
          'post-weblog',
          'regulation',
          'report',
          'review',
          'review-book',
          'software',
          'song',
          'speech',
          'standard',
          'thesis',
          'treaty',
          'webpage',
        ]),
        id: z.union([z.string(), z.number()]),
        'citation-key': z.string().optional(),
        categories: z.array(z.string()).optional(),
        language: z.string().optional(),
        journalAbbreviation: z.string().optional(),
        shortTitle: z.string().optional(),
        author: z.array(z.any()).optional(),
        chair: z.array(z.any()).optional(),
        'collection-editor': z.array(z.any()).optional(),
        compiler: z.array(z.any()).optional(),
        composer: z.array(z.any()).optional(),
        'container-author': z.array(z.any()).optional(),
        contributor: z.array(z.any()).optional(),
        curator: z.array(z.any()).optional(),
        director: z.array(z.any()).optional(),
        editor: z.array(z.any()).optional(),
        'editorial-director': z.array(z.any()).optional(),
        'executive-producer': z.array(z.any()).optional(),
        guest: z.array(z.any()).optional(),
        host: z.array(z.any()).optional(),
        interviewer: z.array(z.any()).optional(),
        illustrator: z.array(z.any()).optional(),
        narrator: z.array(z.any()).optional(),
        organizer: z.array(z.any()).optional(),
        'original-author': z.array(z.any()).optional(),
        performer: z.array(z.any()).optional(),
        producer: z.array(z.any()).optional(),
        recipient: z.array(z.any()).optional(),
        'reviewed-author': z.array(z.any()).optional(),
        'script-writer': z.array(z.any()).optional(),
        'series-creator': z.array(z.any()).optional(),
        translator: z.array(z.any()).optional(),
        accessed: z.any().optional(),
        'available-date': z.any().optional(),
        'event-date': z.any().optional(),
        issued: z.any().optional(),
        'original-date': z.any().optional(),
        submitted: z.any().optional(),
        abstract: z.string().optional(),
        annote: z.string().optional(),
        archive: z.string().optional(),
        archive_collection: z.string().optional(),
        archive_location: z.string().optional(),
        'archive-place': z.string().optional(),
        authority: z.string().optional(),
        'call-number': z.string().optional(),
        'chapter-number': z.union([z.string(), z.number()]).optional(),
        'citation-number': z.union([z.string(), z.number()]).optional(),
        'citation-label': z.string().optional(),
        'collection-number': z.union([z.string(), z.number()]).optional(),
        'collection-title': z.string().optional(),
        'container-title': z.string().optional(),
        'container-title-short': z.string().optional(),
        dimensions: z.string().optional(),
        division: z.string().optional(),
        DOI: z.string().optional(),
        edition: z.union([z.string(), z.number()]).optional(),
        event: z
          .string()
          .describe(
            "[Deprecated - use 'event-title' instead. Will be removed in 1.1]",
          )
          .optional(),
        'event-title': z.string().optional(),
        'event-place': z.string().optional(),
        'first-reference-note-number': z
          .union([z.string(), z.number()])
          .optional(),
        genre: z.string().optional(),
        ISBN: z.string().optional(),
        ISSN: z.string().optional(),
        issue: z.union([z.string(), z.number()]).optional(),
        jurisdiction: z.string().optional(),
        keyword: z.string().optional(),
        locator: z.union([z.string(), z.number()]).optional(),
        medium: z.string().optional(),
        note: z.string().optional(),
        number: z.union([z.string(), z.number()]).optional(),
        'number-of-pages': z.union([z.string(), z.number()]).optional(),
        'number-of-volumes': z.union([z.string(), z.number()]).optional(),
        'original-publisher': z.string().optional(),
        'original-publisher-place': z.string().optional(),
        'original-title': z.string().optional(),
        page: z.union([z.string(), z.number()]).optional(),
        'page-first': z.union([z.string(), z.number()]).optional(),
        part: z.union([z.string(), z.number()]).optional(),
        'part-title': z.string().optional(),
        PMCID: z.string().optional(),
        PMID: z.string().optional(),
        printing: z.union([z.string(), z.number()]).optional(),
        publisher: z.string().optional(),
        'publisher-place': z.string().optional(),
        references: z.string().optional(),
        'reviewed-genre': z.string().optional(),
        'reviewed-title': z.string().optional(),
        scale: z.string().optional(),
        section: z.string().optional(),
        source: z.string().optional(),
        status: z.string().optional(),
        supplement: z.union([z.string(), z.number()]).optional(),
        title: z.string().optional(),
        'title-short': z.string().optional(),
        URL: z.string().optional(),
        version: z.string().optional(),
        volume: z.union([z.string(), z.number()]).optional(),
        'volume-title': z.string().optional(),
        'volume-title-short': z.string().optional(),
        'year-suffix': z.string().optional(),
        custom: z
          .object({})
          .catchall(z.any())
          .describe(
            'Used to store additional information that does not have a designated CSL JSON field. The custom field is preferred over the note field for storing custom data, particularly for storing key-value pairs, as the note field is used for user annotations in annotated bibliography styles.',
          )
          .optional(),
      }),
    })
    .strict(),
});

export const collections = {
  sections,
  references,
  // ,
  // organizations,
};
