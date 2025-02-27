import { reference, z } from 'astro:content';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = import.meta.dirname;
export const DATA_PATH = path.join(__dirname, 'data', 'grist');

export const LocalizedString = z.object({ de: z.string(), en: z.string() });
export const NullableLocalizedString = z.object({
	de: z.string().nullable().optional(),
	en: z.string().nullable().optional(),
});

export const readInputFile = (filename: string) => fs.readFileSync(path.join(DATA_PATH, filename));

export const ReviewSchema = z.object({
	status: reference('reviewStatuses'),
	reviewer: z.string().optional().nullable(),
	log: z.string().optional().nullable(),
});
