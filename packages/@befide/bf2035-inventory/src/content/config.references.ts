import fs from "node:fs";
import path from "node:path";

import { defineCollection, reference, z } from "astro:content";

const INPUT_FILEPATH = path.join("src", "data", "zotero", "kfb_bf2035.json");

export const ReferenceSchema = z.object({
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
  language: z.enum(["en", "de"]).optional(),
  //   url: z.string().url().optional(),
  url: z.string().optional(),
  fulltextLink: z.string().url().optional(),
  doi: z.string().optional(),
  urn: z.string().optional(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  tags: z.array(z.string().optional()),

  organizationRefs: z.array(reference("organizations").optional().nullable()),
  facilityRefs: z.array(reference("facilities").optional().nullable()),
});

export type Reference = z.infer<typeof ReferenceSchema>;

export const defineReferencesCollection = defineCollection({
  loader: async () => {
    const dataRaw = JSON.parse(fs.readFileSync(INPUT_FILEPATH).toString());

    return dataRaw
      .flat()
      .filter((item: any) => item.data.itemType !== "attachment" && item.data.tags.map(({ tag }: { tag: string }) => tag).indexOf("_used") > -1)
      .map((item: any) => {
        const dataItem: Reference = {
          id: item.key,
          title: item.data.title,
          itemType: item.data.itemType,
          language: item.data.language !== "" ? item.data.language : undefined,
          year: item.data.date
            ? Number((item.data.date as string)?.substring(0, 4))
            : undefined,
          publisher: item.data.publisher || item.data.university,
          url: item.data.url !== "" ? item.data.url : undefined,
          creators: item.data.creators,
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
              dataItem.isbn = splittedExtraLine[1];
            } else if (
              splittedExtraLine.length == 2 &&
              splittedExtraLine[0] &&
              splittedExtraLine[0].toLowerCase() === "citation key"
            ) {
              dataItem.citationKey = splittedExtraLine[1];
            } else if (
              splittedExtraLine.length == 2 &&
              splittedExtraLine[0] &&
              splittedExtraLine[0].toLowerCase() === "fulltext-url" &&
              splittedExtraLine[1] !== "none"
            ) {
              dataItem.fulltextLink = splittedExtraLine[1];
            } else {
            }
          });

        dataItem.tags.forEach(async (tag = "") => {
          // if (tag?.startsWith("#academic-degree/doctoral-degree/:dr.rer.nat.")) {
          //   dataItem.isARef = {
          //     collection: "taxonomyItems",
          //     id: "/academic-degree/doctoral-degree/:dr.rer.nat.",
          //   };
          // } else if (
          //   tag?.startsWith("#academic-degree/doctoral-degree/:dr.ing.")
          // ) {
          //   dataItem.isARef = {
          //     collection: "taxonomyItems",
          //     id: "/academic-degree/doctoral-degree/:dr.ing.",
          //   };
          // }

          if (tag?.startsWith("#befide/organization/")) {
            const organizationId = tag.replace("#befide/organization/", "");

            dataItem.organizationRefs.push({
              collection: "organizations",
              id: organizationId,
            });

            // const university = await getEntry("organizations", tag.replace("#befide/organization/", ""))

            // if (university && university.data.isInstanceOf?.id.startsWith("/organization/university")) {
            //   dataItem.universityRef = { collection: "organizations", id: tag.replace("#befide/organization/", "") }

            // }
          }

          if (tag?.startsWith("#befide/facility/")) {
            dataItem.facilityRefs.push({
              id: tag.replace("#befide/facility/", ""),
              collection: "facilities",
            });
          }
        });

        return dataItem;
      });
  },
  schema: ReferenceSchema,
});
