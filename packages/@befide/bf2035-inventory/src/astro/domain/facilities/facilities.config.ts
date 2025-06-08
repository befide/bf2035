const INPUT_FILE = "facilities.csv"

import { csv2json } from "csv42"

import { defineCollection, z } from "astro:content"

import {
  LocalizedString,
  NestableDomainObjectZodSchema,
  NullableLocalizedString,
  readInputFile,
  ReviewSchema,
  ZodStringArrayFromString,
} from "@content/config.common.ts"

export const FacilityZodSchema = NestableDomainObjectZodSchema.extend({
  partOf_id: z.string().nullable(),
  successorOf_id: z.string().nullable(),
  host_id: z.string().nullable(),

  label: LocalizedString,
  tagLine: NullableLocalizedString,
  definition: NullableLocalizedString,

  isBMBF_FIS: z.boolean(),
  isUserFacility: z.boolean(),

  instanceOf_taxonId: z.string().nullable(),

  lifeCycle: z.object({
    currentStatus_taxonId: z.string().nullable(),
    design: z.object({
      startYear: z.number().nullable(),
    }),
    realization: z.object({
      startYear: z.number().nullable(),
    }),
    operation: z.object({
      startYear: z.number().nullable(),
      endYear: z.number().nullable(),
    }),
  }),

  primaryApplication_taxonIds: ZodStringArrayFromString,
  secondaryApplication_taxonIds: ZodStringArrayFromString,

  parameters: z.object({
    primaryBeamParticles: ZodStringArrayFromString,
    secondaryBeamParticles: ZodStringArrayFromString,
    length__m: z.number().nullable(),
    E0__eV: z.number().nullable(),
    E1__eV: z.number().nullable(),
    emittance__mrad: z.number().nullable(),
    powerConsumption__W: z.number().nullable(),
    srPowerLoss__W: z.number().nullable(),
  }),
  links: z.object({
    homepage: NullableLocalizedString,
    references: ZodStringArrayFromString,
  }),
  review: ReviewSchema,
})

export const defineFacilityCollection = defineCollection({
  loader: async () => {
    const input = readInputFile(INPUT_FILE).toString()
    const data = csv2json<FacilitySchema>(input, {
      nested: true,
    })

    data.forEach((item) => {
      item.parent_id = item.partOf_id || item.successorOf_id || null
    })
    return data
  },
  schema: FacilityZodSchema,
})

export type FacilitySchema = z.infer<typeof FacilityZodSchema>

export type Facility = {
  label: string
  tagLine: string[]
  description: string
  host_label: string
  instanceOf_label: string
  isBMBF_FIS: boolean
  isUserFacility: boolean
  primaryApplicationTaxons_label: string[]
  secondaryApplicationTaxons_label: string[]
  operation_startYear: number | undefined
  operation_endYear: number | undefined
  parameters: {
    primaryBeamParticles: string[]
    secondaryBeamParticles: string[]
  }
  links: {
    homepage: string
  }
}
