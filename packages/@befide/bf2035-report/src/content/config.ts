import { z, defineCollection, reference } from 'astro:content';

const tags = z.array(z.string()).optional()

export const ScopedTag = z.object({
  scope: z.string().optional(),
  value: z.string(),
})
export const ScopedTags = z.array(ScopedTag).optional()

const sectionCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        abstract: z.string().optional(),
        lang: z.string().optional(),
        backgroundImageSrc: image().optional(),
        bibliography: z.string().optional(),
        excludeFromTour: z.boolean().optional(),
        isTocItemCollapsible: z.boolean().optional(),
        layoutType: z.string().optional(), // part, spread, left, right
        pageClass: z.string().optional(),
        pageName: z.string().optional(),
        pageType: z.string().optional(),
        path: z.string().optional(),
        sectionNumber: z.string().optional(),
        description: z.string().optional(),
        template: z.string().optional(),
        subtitle: z.string().optional(),
        supertitle: z.string().optional(),
        tags,
        title__toc: z.string().optional(),
        title: z.string(),
        tocIcon: z.string().optional(),
        virtual: z.boolean().optional(),
      })
      .strict(),
})

const causalMapNodeCollection = defineCollection({
  schema: () =>
    z
      .object({
        title: z.string(),
        title_short: z.string().optional(),
        description: z.string().optional(),
        sigel: z.string().optional(),
        i_x: z.number().optional(),
        i_y: z.number().optional(),
        v3_x: z.number().optional(),
        v3_y: z.number().optional(),
        cluster: z.string().optional(),
        parent: reference("causal-map-nodes").optional(),

        type: z.string(),

        influences_positively: z
          .array(reference("causal-map-nodes"))
          .optional(),
        influences_positively2: z.array(z.string()).optional(),
        influences_negatively: z
          .array(reference("causal-map-nodes"))
          .optional(),
      })
      .strict(),
})

const referenceCollection = defineCollection({
  // type: 'data',
  schema: z
    .object({
      tags: ScopedTags,

      bibTex: z.string(),
      rendered: z.object({
        bibliography: z.string(),
        citation: z.string(),
      }),
      cslItem: z.object({
        type: z.enum([
          "article",
          "article-journal",
          "article-magazine",
          "article-newspaper",
          "bill",
          "book",
          "broadcast",
          "chapter",
          "classic",
          "collection",
          "dataset",
          "document",
          "entry",
          "entry-dictionary",
          "entry-encyclopedia",
          "event",
          "figure",
          "graphic",
          "hearing",
          "interview",
          "legal_case",
          "legislation",
          "manuscript",
          "map",
          "motion_picture",
          "musical_score",
          "pamphlet",
          "paper-conference",
          "patent",
          "performance",
          "periodical",
          "personal_communication",
          "post",
          "post-weblog",
          "regulation",
          "report",
          "review",
          "review-book",
          "software",
          "song",
          "speech",
          "standard",
          "thesis",
          "treaty",
          "webpage",
        ]),
        id: z.union([z.string(), z.number()]),
        "citation-key": z.string().optional(),
        categories: z.array(z.string()).optional(),
        language: z.string().optional(),
        journalAbbreviation: z.string().optional(),
        shortTitle: z.string().optional(),
        author: z.array(z.any()).optional(),
        chair: z.array(z.any()).optional(),
        "collection-editor": z.array(z.any()).optional(),
        compiler: z.array(z.any()).optional(),
        composer: z.array(z.any()).optional(),
        "container-author": z.array(z.any()).optional(),
        contributor: z.array(z.any()).optional(),
        curator: z.array(z.any()).optional(),
        director: z.array(z.any()).optional(),
        editor: z.array(z.any()).optional(),
        "editorial-director": z.array(z.any()).optional(),
        "executive-producer": z.array(z.any()).optional(),
        guest: z.array(z.any()).optional(),
        host: z.array(z.any()).optional(),
        interviewer: z.array(z.any()).optional(),
        illustrator: z.array(z.any()).optional(),
        narrator: z.array(z.any()).optional(),
        organizer: z.array(z.any()).optional(),
        "original-author": z.array(z.any()).optional(),
        performer: z.array(z.any()).optional(),
        producer: z.array(z.any()).optional(),
        recipient: z.array(z.any()).optional(),
        "reviewed-author": z.array(z.any()).optional(),
        "script-writer": z.array(z.any()).optional(),
        "series-creator": z.array(z.any()).optional(),
        translator: z.array(z.any()).optional(),
        accessed: z.any().optional(),
        "available-date": z.any().optional(),
        "event-date": z.any().optional(),
        issued: z.any().optional(),
        "original-date": z.any().optional(),
        submitted: z.any().optional(),
        abstract: z.string().optional(),
        annote: z.string().optional(),
        archive: z.string().optional(),
        archive_collection: z.string().optional(),
        archive_location: z.string().optional(),
        "archive-place": z.string().optional(),
        authority: z.string().optional(),
        "call-number": z.string().optional(),
        "chapter-number": z.union([z.string(), z.number()]).optional(),
        "citation-number": z.union([z.string(), z.number()]).optional(),
        "citation-label": z.string().optional(),
        "collection-number": z.union([z.string(), z.number()]).optional(),
        "collection-title": z.string().optional(),
        "container-title": z.string().optional(),
        "container-title-short": z.string().optional(),
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
        "event-title": z.string().optional(),
        "event-place": z.string().optional(),
        "first-reference-note-number": z
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
        "number-of-pages": z.union([z.string(), z.number()]).optional(),
        "number-of-volumes": z.union([z.string(), z.number()]).optional(),
        "original-publisher": z.string().optional(),
        "original-publisher-place": z.string().optional(),
        "original-title": z.string().optional(),
        page: z.union([z.string(), z.number()]).optional(),
        "page-first": z.union([z.string(), z.number()]).optional(),
        part: z.union([z.string(), z.number()]).optional(),
        "part-title": z.string().optional(),
        PMCID: z.string().optional(),
        PMID: z.string().optional(),
        printing: z.union([z.string(), z.number()]).optional(),
        publisher: z.string().optional(),
        "publisher-place": z.string().optional(),
        references: z.string().optional(),
        "reviewed-genre": z.string().optional(),
        "reviewed-title": z.string().optional(),
        scale: z.string().optional(),
        section: z.string().optional(),
        source: z.string().optional(),
        status: z.string().optional(),
        supplement: z.union([z.string(), z.number()]).optional(),
        title: z.string().optional(),
        "title-short": z.string().optional(),
        URL: z.string().optional(),
        version: z.string().optional(),
        volume: z.union([z.string(), z.number()]).optional(),
        "volume-title": z.string().optional(),
        "volume-title-short": z.string().optional(),
        "year-suffix": z.string().optional(),
        custom: z
          .object({})
          .catchall(z.any())
          .describe(
            "Used to store additional information that does not have a designated CSL JSON field. The custom field is preferred over the note field for storing custom data, particularly for storing key-value pairs, as the note field is used for user annotations in annotated bibliography styles.",
          )
          .optional(),
      }),
    })
    .strict(),
})

export const collections = {
  sections: sectionCollection,
  references: referenceCollection,
  "causal-map-nodes": causalMapNodeCollection
}
