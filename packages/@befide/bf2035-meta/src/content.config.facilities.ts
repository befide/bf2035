const INPUT_FILE = 'facilities.csv';

import { csv2json } from 'csv42';

import { defineCollection, reference, z } from 'astro:content';

import {
  readInputFile,
  LocalizedString,
  NullableLocalizedString,
  ReviewSchema
} from './content.config.common';

export const FacilitySchema = z.object({
  id: z.string(),
  label: z.object({
    fullName: LocalizedString,
    short: NullableLocalizedString
  }),
  definition: NullableLocalizedString,
  hasParent: reference('facilities').optional().nullable(),
  isSuccessorOf: reference('facilities').optional().nullable(),
  employsAcceleratorTypes: z.string().optional().nullable(),
  isInstanceOf: reference('taxonomy').optional().nullable(),
  facilityTypeParticles: z.string().optional().nullable(),
  lifeCycle: reference('taxonomy')
    .refine((d) => d.id.indexOf('/facility-life-cycle/') === 0)
    .optional()
    .nullable(),
  t0: z.number().optional().nullable(),
  t1: z.number().optional().nullable(),
  hasHost: reference('organizations').optional().nullable(),
  isBmbfFis: z.string().optional().nullable(),
  primaryApplications: z.string().optional().nullable(),
  secondaryApplications: z.string().optional().nullable(),
  link: z.object({
    homepage: NullableLocalizedString
  }),
  review: ReviewSchema
});

export const defineFacilityCollection = defineCollection({
  loader: async () => {
    const input = readInputFile(INPUT_FILE).toString();
    const data = csv2json<Facility>(input, {
      nested: true
    });
    return data;
  },
  schema: FacilitySchema
});

export type Facility = z.infer<typeof FacilitySchema>;
