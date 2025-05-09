import fs from "node:fs";
import path from "node:path";

import { defineCollection, reference, z } from "astro:content";

const INPUT_FILEPATH = path.join("src", "data", "zotero", "kfb_theses.json");

const universityIds = [
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
];

export const ThesesSchema = z.object({
  id: z.string(),
  citationKey: z.string().optional(),
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
  isARef: reference("taxonomyItems").optional().nullable(),
  universityRef: reference("organizations").optional().nullable(),
  organizationRefs: z.array(reference("organizations").optional().nullable()),
  facilityRefs: z.array(reference("facilities").optional().nullable()),
});

export type Theses = z.infer<typeof ThesesSchema>;

export const defineThesesCollection = defineCollection({
  loader: async () => {
    const dataRaw = JSON.parse(fs.readFileSync(INPUT_FILEPATH).toString());

    return dataRaw.flat().map((item: any) => {
      // console.log('\n\n');
      // console.log(JSON.stringify({ item }, null, 2));
      const dataItem: Theses = {
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
        organizationRefs: [],
        facilityRefs: [],
      };

      if (item.data.url?.startsWith("https://doi.org/")) {
        dataItem.doi = item.data.url.replace("https://doi.org/", "");
      }
      if (item.data.url?.startsWith("https://nbn-resolving.de/")) {
        dataItem.urn = item.data.url.replace("https://nbn-resolving.de/", "");
      }

      if (item.data.extra)
        item.data.extra.split("\n").forEach((extraLine: string) => {
          const splittedExtraLine = extraLine.split(/: /);
          if (
            splittedExtraLine.length == 2 &&
            splittedExtraLine[0] &&
            splittedExtraLine[0].toLowerCase() === "doi"
          ) {
            dataItem.doi = splittedExtraLine[1];
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
          } else {
            // console.log({
            //   message: 'extra line not parsed',
            //   extraLine
            //   // id: item.key
            // });
          }
        });

      dataItem.tags.forEach(async (tag = "") => {
        if (tag?.startsWith("#academic-degree/doctoral-degree/:dr.rer.nat.")) {
          dataItem.isARef = {
            collection: "taxonomyItems",
            id: "/academic-degree/doctoral-degree/:dr.rer.nat.",
          };
        } else if (
          tag?.startsWith("#academic-degree/doctoral-degree/:dr.ing.")
        ) {
          dataItem.isARef = {
            collection: "taxonomyItems",
            id: "/academic-degree/doctoral-degree/:dr.ing.",
          };
        }

        if (tag?.startsWith("#befide/organization/")) {
          const organizationId = tag.replace("#befide/organization/", "");

          dataItem.organizationRefs.push({
            collection: "organizations",
            id: organizationId,
          });

          if (universityIds.indexOf(organizationId) > -1) {
            dataItem.universityRef = {
              collection: "organizations",
              id: organizationId,
            };
          }

          // const university = await getEntry("organizations", tag.replace("#befide/organization/", ""))

          // if (university && university.data.isInstanceOf?.id.startsWith("/organization/university")) {
          //   dataItem.universityRef = { collection: "organizations", id: tag.replace("#befide/organization/", "") }

          // }
        }
        if (tag?.startsWith("#person/gender/")) {
          dataItem.author.gender = tag.replace("#person/gender/", "");
        }
        if (tag?.startsWith("#befide/facility/")) {
          dataItem.facilityRefs.push({
            id: tag.replace("#befide/facility/", ""),
            collection: "facilities",
          });
        }
      });

      // console.log(dataItem)

      return dataItem;
    });
  },
  schema: ThesesSchema,
});
