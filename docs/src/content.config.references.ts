// import fs from 'node:fs'
// import path from 'node:path'
// import { defineCollection } from 'astro:content'
// import { z } from 'astro:content'
//
// const INPUT_FILEPATH = path.join(
//   'src',
//   'data',
//   'zotero',
//   'kfb_bf2035_used.json'
// )
//
// export const ReferenceSchema = z.object({
//   id: z.string(),
//   year: z.number(),
//   type: z.string(),
//
//   author: z.array(
//     z.union([
//       z.object({ family: z.string(), given: z.string() }),
//       z.object({ literal: z.string() }),
//     ])
//   ),
//   title: z.string(),
//   issued: z.object({ 'date-parts': z.array(z.array(z.string())) }),
//   doi: z.string().nullable(),
//   urn: z.string().nullable(),
//   language: z.string(),
//   tags: z.array(z.string().optional()),
// })
//
// export type Reference = z.infer<typeof ReferenceSchema>
//
// export const defineReferenceCollection = defineCollection({
//   loader: async () => {
//     const dataRaw = JSON.parse(fs.readFileSync(INPUT_FILEPATH).toString())
//     const data = dataRaw.flatMap((item: any) => {
//       // @ts-ignore
//       const dataItem: Reference = {
//         id: item.key,
//         title: item.data.title,
//         language: item.data.language || 'en',
//         year: Number(item.data.date?.substring(0, 4) || 0),
//         type: item.data.type,
//         // publisher: item.data.publisher || item.data.university,
//         // url: item.data.url,
//         author: [
//           {
//             family: item.data.creators[0]?.lastName,
//             given: item.data.creators[0]?.firstName,
//           },
//         ],
//         tags: item.data.tags.map(({ tag }: { tag: String }) => tag),
//       }
//
//       // if (item.data.url?.startsWith('https://doi.org/')) {
//       //   dataItem.doi = item.data.url.replace('https://doi.org/', '');
//       // }
//       // if (item.data.url?.startsWith('https://nbn-resolving.de/')) {
//       //   dataItem.urn = item.data.url.replace('https://nbn-resolving.de/', '');
//       // }
//
//       // if (item.data.extra) {
//       //   item.data.extra.split('\n').forEach((extraLine: String) => {
//       //     const splittedExtraLine = extraLine.split(/: /);
//       //     if (
//       //       splittedExtraLine.length == 2 &&
//       //       splittedExtraLine[0].toLowerCase() === 'doi'
//       //     ) {
//       //       dataItem.doi = splittedExtraLine[1];
//       //     } else if (
//       //       splittedExtraLine.length == 2 &&
//       //       splittedExtraLine[0].toLowerCase() === 'isbn'
//       //     ) {
//       //       dataItem.isbn = splittedExtraLine[1];
//       //     } else if (
//       //       splittedExtraLine.length == 2 &&
//       //       splittedExtraLine[0].toLowerCase() === 'fulltext-url' &&
//       //       splittedExtraLine[1] !== 'none'
//       //     ) {
//       //       dataItem.fulltextLink = splittedExtraLine[1];
//       //     } else if (splittedExtraLine[0].toLowerCase() === 'citation key') { } else { }
//       //     console.log({
//       //       message: 'extra line not parsed',
//       //       extraLine
//       //       // id: item.key
//       //     });
//       //   }}
//
//       // dataItem.tags.forEach((tag: string) => {
//       //   if (tag.startsWith('/information-content-entity/')) {
//       //     dataItem.isARef = tag;
//       //   }
//       //   if (tag.startsWith('#befide/organization/')) {
//       //     dataItem.universityRef = tag.replace('#befide/organization/', '');
//       //   }
//       //   if (tag.startsWith('/person/gender/')) {
//       //     dataItem.author.gender = tag.replace('/person/gender/', '');
//       //   }
//       //   if (tag.startsWith('#befide/facility/')) {
//       //     dataItem.facilities.push(tag.replace('#befide/facility/', ''));
//       //   }
//       // })
//       return dataItem
//     })
//
//     // console.log(JSON.stringify({ item, dataItem }, null, 2));
//
//     return data
//   },
//   schema: ReferenceSchema,
// })
