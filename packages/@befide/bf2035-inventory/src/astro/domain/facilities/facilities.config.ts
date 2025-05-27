const INPUT_FILE = "facilities.csv"

import { csv2json } from "csv42"

import { defineCollection, z } from "astro:content"

import {
  LocalizedString,
  NestedDomainObjectZodSchema,
  NullableLocalizedString,
  readInputFile,
  ReviewSchema
} from "../../../content/config.common"

export const FacilityZodSchema = NestedDomainObjectZodSchema.extend({
  partOf_id: z.string().optional().nullable(),
  versionOf_id: z.string().optional().nullable(),
  host_id: z.string().nullable(),

  label: LocalizedString,
  tagLine: NullableLocalizedString,
  definition: NullableLocalizedString,

  isBMBF_FIS: z.boolean(),
  isUserFacility: z.boolean(),

  instanceOfTaxon_id: z.string().nullable(),

  lifeCycle: z.object({
    currentStatusTaxon_id: z.string().nullable(),
    design: z
      .object({
        startYear: z.number().nullable()
      })
      .optional(),
    realization: z
      .object({
        startYear: z.number().nullable()
      })
      .optional(),
    operation: z
      .object({
        startYear: z.number().nullable(),
        endYear: z.number().nullable()
      })
      .optional()
  }),

  primaryApplicationTaxons_id: z.preprocess(
    (input) => (input ? (input + "").split(/\s?,\s?/).filter((d) => !!d) : []),
    z.array(z.string())
  ),

  secondaryApplicationTaxons_id: z.preprocess(
    (input) => (input ? (input + "").split(/\s?,\s?/).filter((d) => !!d) : []),
    z.array(z.string())
  ),

  parameters: z.object({
    primaryBeamParticles: z.preprocess(
      (input) =>
        input ? (input + "").split(/\s?,\s?/).filter((d) => !!d) : [],
      z.array(z.string()).nullable()
    ),
    secondaryBeamParticles: z.preprocess(
      (input) =>
        input ? (input + "").split(/\s?,\s?/).filter((d) => !!d) : [],
      z.array(z.string()).nullable()
    ),
    length__m: z.number().optional().nullable(),
    E0__eV: z.number().optional().nullable(),
    E1__eV: z.number().optional().nullable(),
    emittance__mrad: z.number().optional().nullable(),
    powerConsumption__W: z.number().optional().nullable(),
    srPowerLoss__W: z.number().optional().nullable()
  }),
  links: z.object({
    homepage: NullableLocalizedString,
    references: z.preprocess((input) => {
      return (input + "").split(/\s?,\s?/)
    }, z.array(z.string()).nullable())
  }),
  review: ReviewSchema
})

export const defineFacilityCollection = defineCollection({
  loader: async () => {
    const input = readInputFile(INPUT_FILE).toString()
    const data = csv2json<FacilitySchema>(input, {
      nested: true
    })

    data.forEach(item => {
      item.parent_id = (item.partOf_id || item.versionOf_id) || null
    })
    return data
  },
  schema: FacilityZodSchema
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
  secondaryApplicationTaxons_label: string[],
  operation_startYear: number | undefined,
  operation_endYear: number | undefined,
  parameters: {
    primaryBeamParticles: string[]
    secondaryBeamParticles: string[]
  }
  links: {
    homepage: string
  }
}
