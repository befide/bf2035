import fs from "node:fs"
import path from "node:path"

import { defineCollection, z } from "astro:content"
import { DomainObjectZodSchema } from "@/content/config.common"

const INPUT_FILEPATH = path.join("src", "data", "zotero", "kfb_theses.json")

const UNIVERSITY_IDS = [
  ":hu-berlin",
  ":kit",
  ":rwth-aachen",
  ":tu-berlin",
  ":tu-darmstadt",
  ":tu-dortmund",
  ":tu-dresden",
  ":uni-bonn",
  ":uni-düsseldorf",
  ":uni-erlangen",
  ":uni-frankfurt",
  ":uni-goettingen",
  ":uni-hamburg",
  ":uni-jena",
  ":uni-kassel",
  ":uni-mainz",
  ":uni-rostock",
  ":uni-siegen",
  ":uni-wuppertal",
]

export const ThesisZodSchema = DomainObjectZodSchema.extend({
  id: z.string(),
  citationKey: z.string(),
  author: z.object({
    familyName: z.string(),
    givenName: z.string(),
    gender: z.string().optional().nullable(),
  }),
  year: z.number(),
  title: z.string(),
  language: z.enum(["en", "de"]),
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
  isA_taxonId: z.string().optional(), //reference("taxonomyItems").optional().nullable(),
  university__organizationsId: z.string().nullable(), //reference("organizations").optional().nullable(),
  organizations__organizationsId: z.array(z.string()), // z.array(reference("organizations").optional().nullable()),
  facilities__facilityId: z.array(z.string()), //z.array(reference("facilities").optional().nullable()),
})

export type ThesisSchema = z.infer<typeof ThesisZodSchema>

export const defineThesesCollection = defineCollection({
  loader: async () => {
    const dataRaw = JSON.parse(fs.readFileSync(INPUT_FILEPATH).toString())

    return dataRaw.flat().map((item: any) => {
      const dataItem: ThesisSchema = {
        id: item.key,
        title: item.data.title,
        language: item.data.language,
        abstract: item.data.abstractNote,
        thesisType: item.data.thesisType,

        year: Number((item.data.date as string)?.substring(0, 4)),
        publisher: item.data.publisher || item.data.university,
        url: item.data.url,
        author: {
          familyName: item.data.creators[0]?.lastName,
          givenName: item.data.creators[0]?.firstName,
        },
        tags: item.data.tags.map(({ tag }: { tag: string }) => tag),
        organizations__organizationsId: [],
        facilities__facilityId: [],
        citationKey: item.data.citationKey,
        university__organizationsId: null,
      }

      if (item.data.url?.startsWith("https://doi.org/")) {
        dataItem.doi = item.data.url.replace("https://doi.org/", "")
      }
      if (item.data.url?.startsWith("https://nbn-resolving.de/")) {
        dataItem.urn = item.data.url.replace("https://nbn-resolving.de/", "")
      }

      if (item.data.extra)
        item.data.extra.split("\n").forEach((extraLine: string) => {
          const splittedExtraLine = extraLine.split(/: /)
          if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0] &&
            splittedExtraLine[0].toLowerCase() === "doi"
          ) {
            dataItem.doi = splittedExtraLine[1]
          } else if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0] &&
            splittedExtraLine[0].toLowerCase() === "isbn"
          ) {
            dataItem.isbn = splittedExtraLine[1]
          } else if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0] &&
            splittedExtraLine[0].toLowerCase() === "citation key"
          ) {
            dataItem.citationKey = splittedExtraLine[1]
          } else if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0] &&
            splittedExtraLine[0].toLowerCase() === "fulltext-url" &&
            splittedExtraLine[1] !== "none"
          ) {
            dataItem.fulltextLink = splittedExtraLine[1]
          }
        })

      dataItem.tags.forEach(async (tag = "") => {
        if (tag?.startsWith("#academic-degree/doctoral-degree/:dr.rer.nat.")) {
          dataItem.isA_taxonId = "/academic-degree/doctoral-degree/:dr.rer.nat."
        } else if (
          tag?.startsWith("#academic-degree/doctoral-degree/:dr.ing.")
        ) {
          dataItem.isA_taxonId = "/academic-degree/doctoral-degree/:dr.ing."
        }

        if (tag?.startsWith("#befidesh/organization/")) {
          const organizationId = tag.replace("#befidesh/organization/", "")

          dataItem.organizations__organizationsId.push(organizationId)

          if (UNIVERSITY_IDS.indexOf(organizationId) > -1) {
            dataItem.university__organizationsId = organizationId
          }
        }
        if (tag?.startsWith("#person/gender/")) {
          dataItem.author.gender = tag.replace("#person/gender/", "")
        }
        if (tag?.startsWith("#befidesh/facility/")) {
          dataItem.facilities__facilityId.push(
            tag.replace("#befidesh/facility/", "")
          )
        }
      })

      return dataItem
    })
  },
  schema: ThesisZodSchema,
})
