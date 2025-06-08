import { getCollection, getEntry } from "astro:content"

import { flattenTreeNodes, getRoots, type TreeNode } from "../content.tree"
import {
  peopleCountDiscriminators,
  type OrganizationSchema,
} from "@/astro/domain/organizations/organizations.config"
import { getValue } from "../index"
import { ascending } from "d3-array"
import { Organization } from "./organization"
import { getLocalizedValue } from "../content"

export const allOrganizations = async () =>
  (await getCollection("organizations")).map(({ data }) => data)

export const allOrganizationsForTopLevelOrganization = async (
  topLevel_organizationId: string
) => {
  return await getCollection(
    "organizations",
    ({ data, id }) =>
      topLevel_organizationId === undefined ||
      data.topLevel_organizationId === topLevel_organizationId ||
      id === topLevel_organizationId ||
      id === ":"
  )
}

export const allCommunityTopLevelOrganizations = async () =>
  await getCollection(
    "organizations",
    (entry) =>
      entry.data.isPartOfCommunity &&
      !entry.data.topLevel_organizationId &&
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

export const getOrganizationRoots = (items: OrganizationSchema[]) => {
  return getRoots<OrganizationSchema>(items)
}

export function rollupUniquePeopleCountSum(node: TreeNode<OrganizationSchema>) {
  if (node.children.length === 0) {
    node.data.uniquePeopleCountRecursiveSum = {
      total: node.data.uniquePeopleCountSum.total,
      ...Object.fromEntries(
        peopleCountDiscriminators.map((d) => [
          d,
          getValue(node.data.uniquePeopleCountSum, d),
        ])
      ),
    }
  } else {
    node.children.forEach((child) => rollupUniquePeopleCountSum(child))
    node.data.uniquePeopleCountRecursiveSum = {
      total: node.children.reduce(
        (sum, child) =>
          sum + getValue(child.data.uniquePeopleCountRecursiveSum, "total"),
        getValue(node.data.uniquePeopleCountSum, "total")
      ),
      ...Object.fromEntries(
        peopleCountDiscriminators.map((d) => [
          d,
          node.children.reduce(
            (sum, child) =>
              sum + getValue(child.data.uniquePeopleCountRecursiveSum, d),
            getValue(node.data.uniquePeopleCountSum, d)
          ),
        ])
      ),
    }
  }

  return node
}

export const organizationsItemRoots = async () => {
  const items = (await getCollection("organizations")).map((d) => d.data)

  return getOrganizationsRoots(items)
}

export const getOrganizationsRoots = (items: OrganizationSchema[]) => {
  return getRoots<OrganizationSchema>(items)
}

export const organizationsForAPI = async (locale: string) => {
  const organizations = await allCommunityTopLevelOrganizations()
  return await Promise.all(
    organizations
      .filter((o) => o.id !== ":")
      .map(
        async (organization) =>
          await new Organization(organization.data).getDto(locale)
      )
  )
}
