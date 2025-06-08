import { z } from "astro:content"
import path from "node:path"
import fs from "node:fs"

const __dirname = import.meta.dirname
export const DATA_PATH = path.join(__dirname, "..", "data", "grist")

export const DomainObjectZodSchema = z.object({
  id: z.string(),
})
// export type DomainObjectSchema = z.infer<typeof DomainObjectZodSchema>;
export type DomainObjectSchema = {
  id: string
}

export const NestableDomainObjectZodSchema = DomainObjectZodSchema.extend({
  parent_id: z.string().nullable(),
})
export type NestableDomainObjectSchema = DomainObjectSchema & {
  id: string
  parent_id: string | null
}
// export type NestableDomainObjectSchema = z.infer<
//   typeof NestableDomainObjectZodSchema
// >

export const LocalizedString = z.object({ de: z.string(), en: z.string() })
export const NullableLocalizedString = z.object({
  de: z.string().nullable(),
  en: z.string().nullable(),
})

export const readInputFile = (filename: string) =>
  fs.readFileSync(path.join(DATA_PATH, filename))

export const ReviewSchema = z.object({
  status_id: z.string().optional().nullable(),
  reviewer_contactId: z.string().optional().nullable(),
  log: z.string().optional().nullable(),
})

export const ZodStringArrayFromString = z.preprocess((input) => {
  return input ? (input + "").split(/\s?,\s?/).filter((d) => !!d) : []
}, z.array(z.string()))
