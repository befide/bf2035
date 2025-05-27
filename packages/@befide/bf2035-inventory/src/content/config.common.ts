import {  z } from "astro:content";
import path from "node:path";
import fs from "node:fs";

const __dirname = import.meta.dirname;
export const DATA_PATH = path.join(__dirname, "..", "data", "grist");

export const DomainObjectZodSchema = z.object({
  id: z.string()
})
export type DomainObjectSchema = z.infer<typeof DomainObjectZodSchema>;

export const NestedDomainObjectZodSchema = DomainObjectZodSchema.extend({
  parent_id: z.string().nullable()
})
export type NestedDomainObjectSchema = z.infer<typeof NestedDomainObjectZodSchema>;

export const LocalizedString = z.object({ de: z.string(), en: z.string() });
export const NullableLocalizedString = z.object({
  de: z.string().nullable().optional(),
  en: z.string().nullable().optional(),
});

export const readInputFile = (filename: string) =>
  fs.readFileSync(path.join(DATA_PATH, filename));

export const ReviewSchema = z.object({
  status_id: z.string().optional().nullable(),
  reviewer: z.string().optional().nullable(),
  log: z.string().optional().nullable()
})
