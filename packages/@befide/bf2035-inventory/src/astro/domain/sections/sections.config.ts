import { z, defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import spaceCommander from "@utils/space-commander"
import { NestableDomainObjectZodSchema } from "@/content/config.common"

const SectionZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
})

//   NestableDomainObjectZodSchema.extend({
//   /** The title of the current page. Required. */
//   title: z.string(),

//   /**
//    * A short description of the current page’s content. Optional, but recommended.
//    * A good description is 150–160 characters long and outlines the key content
//    * of the page in a clear and engaging way.
//    */
//   description: z.string().optional(),

//   // const tags = z.array(z.string()).optional();
// })

export const defineSectionCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sections" }),

  schema: SectionZodSchema,
  // z
  //   .object({
  //     abstract: z
  //       .string()
  //       .optional()
  //       .transform((str) => spaceCommander(str)),
  //     // backgroundImageSrc: image().optional(),
  //     bibliography: z.string().optional(),
  //     excludeFromToc: z.boolean().optional().default(false),
  //     excludeFromTour: z.boolean().optional().default(false),
  //     language: z.enum(['de', 'en']).optional(),
  //     path: z.string().optional(),
  //     sectionClass: z.string().optional(),
  //     sectionNumber: z.string().optional(),
  //     sectionType: z.string().optional(), // part, spread, left, right
  //     subtitle: z
  //       .string()
  //       .optional()
  //       .transform((str) => spaceCommander(str)),
  //     supertitle: z
  //       .string()
  //       .optional()
  //       .transform((str) => spaceCommander(str)),
  //     tags,
  //     title__toc: z.string().optional(),
  //     title: z.string().transform((str) => spaceCommander(str)),
  //     tocIcon: z.string().optional(),
  //   })
  //   .strict(),
})
