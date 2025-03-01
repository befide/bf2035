const INPUT_FILE = 'facilities.csv';

import { csv2json } from 'csv42';

import { defineCollection, reference, z } from 'astro:content';

import {
	LocalizedString,
	NullableLocalizedString,
	readInputFile,
	ReviewSchema,
} from './content.config.common';

export const FacilitySchema = z.object({
	id: z.string(),
	label: z.object({
		fullName: LocalizedString,
		short: NullableLocalizedString,
	}),
	definition: NullableLocalizedString,
	isBmbfFis: z.string().optional().nullable(),
	isUserFacility: z.boolean(),
	hasHost: reference('organizations').optional().nullable(),
	isInstanceOf: reference('taxonomyItems').optional().nullable(),

	hasParent: reference('facilities').optional().nullable(),
	isSuccessorOf: reference('facilities').optional().nullable(),

	employsAcceleratorTypes: z.string().optional().nullable(),

	lifeCycle: reference('taxonomyItems')
		// .refine((d: string) => d?.indexOf('/facility-life-cycle/') > -1)
		.optional()
		.nullable(),

	primaryBeamParticles: z.preprocess((input) => {
		return typeof input === 'string' ? input.split(/\s?,\s?/) : input;
	}, z.array(z.string()).nullable()),
	secondaryBeamParticles: z.preprocess((input) => {
		return typeof input === 'string' ? input.split(/\s?,\s?/) : input;
	}, z.array(z.string()).nullable()),

	primaryApplications: z.preprocess(
		(input) => {
			return typeof input === 'string' ? input.split(/\s?,\s?/) : input;
		},
		z.array(reference('taxonomyItems')).nullable()
	),
	secondaryApplications: z.preprocess(
		(input) => {
			return typeof input === 'string' ? input.split(/\s?,\s?/) : input;
		},
		z.array(reference('taxonomyItems')).nullable()
	),
	parameters: z.object({
		length__m: z.number().optional().nullable(),
		E_0__eV: z.number().optional().nullable(),
		E_1__eV: z.number().optional().nullable(),
		emittance__mrad: z.number().optional().nullable(),
		powerConsumption__W: z.number().optional().nullable(),
		srPowerLoss__w: z.number().optional().nullable(),
		yearOfOperationStart: z.number().optional().nullable(),
		yearOfOperationEnd: z.number().optional().nullable(),
	}),
	links: z.object({
		homepage: NullableLocalizedString,
		references: z.preprocess((input) => {
			return typeof input === 'string' ? input.split(/\s?,\s?/) : input;
		}, z.array(z.string()).nullable()),
	}),
	review: ReviewSchema,
});

export const defineFacilityCollection = defineCollection({
	loader: async () => {
		const input = readInputFile(INPUT_FILE).toString();
		return csv2json<Facility>(input, {
			nested: true,
		});
	},
	schema: FacilitySchema,
});

export type Facility = z.infer<typeof FacilitySchema>;
