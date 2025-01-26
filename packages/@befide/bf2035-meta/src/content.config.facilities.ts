const INPUT_FILE = 'facilities.csv';

import { csv2json } from 'csv42';

import { defineCollection, reference, z } from 'astro:content';

import {
  readInputFile,
  LocalizedString,
  NullableLocalizedString
} from './content.config.common';

export const FacilitySchema = z.object({
  id: z.string(),
  meta: z.object({
    reviewStatus: reference('reviewStatuses'),
    reviewedBy: z.string().optional().nullable(),
    reviewLog: z.string().nullable().default('')
  }),
  label: z.object({
    fullName: LocalizedString,
    short: NullableLocalizedString
  }),
  definition: NullableLocalizedString,
  isDirectPartOf: reference('facilities').optional().nullable(),
  isSuccessorOf: reference('facilities').optional().nullable(),
  employsAcceleratorTypes: z.string().optional().nullable(),
  isInstanceOf: reference('taxonomy').optional().nullable(),
  facilityTypeParticles: z.string().optional().nullable(),
  lifeCycle: z.string().optional().nullable(),
  t0: z.number().optional().nullable(),
  t1: z.number().optional().nullable(),
  hasHost: reference('organizations').optional().nullable(),
  isBmbfFis: z.string().optional().nullable(),
  primaryApplications: z.string().optional().nullable(),
  secondaryApplications: z.string().optional().nullable(),
  link: z.object({
    homepage: NullableLocalizedString
  })
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
