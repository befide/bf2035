import { getCollection } from "astro:content"

import { getRoots, type TreeNode } from "../content.tree"
import {
  type OrganizationSchema,
  peopleCountDiscriminators,
} from "@/astro/domain/organizations/organizations.config"
import { getValue } from "../index"
import { Organization } from "./organization"

export const allOrganizations = async () =>
  (await getCollection("organizations")).map(({ data }) => data)

export const allOrganizationsForTopLevelOrganization = async (
  topLevel__id: string
) => {
  return await getCollection(
    "organizations",
    ({ data, id }) =>
      topLevel__id === undefined ||
      data.topLevel__id === topLevel__id ||
      id === topLevel__id ||
      id === ":"
  )
}

export const allCommunityTopLevelOrganizations = async () =>
  await getCollection(
    "organizations",
    (entry) =>
      entry.data.isPartOfCommunity &&
      !entry.data.topLevel__id &&
      entry.data.befideOrganizationCategories.indexOf("committee") !== 0
  )

export const allCommunityOrganizations = async () =>
  (
    await getCollection(
      "organizations",
      (entry) =>
        entry.data.isPartOfCommunity &&
        entry.data.befideOrganizationCategories.indexOf("committee") !== 0
    )
  ).map((d) => d.data)

export const getOrganizationCategories = async () =>
  Array.from(
    new Set(
      (await allCommunityTopLevelOrganizations()).flatMap(
        (entry) => entry.data.befideOrganizationCategories
      )
    )
  )

export const organizationsForAPI = async (locale: string) => {
  const organizations = await allCommunityTopLevelOrganizations()
  console.log(organizations)
  return await Promise.all(
    organizations
      .filter((o) => o.id !== ":")
      .map(
        async (organization) =>
          await new Organization(organization.data).getDto(locale)
      )
  )
}
