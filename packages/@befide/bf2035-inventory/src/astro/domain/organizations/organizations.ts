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

export const getOrganizationTree = async (rootId: string) => {
  const orgs = (
    await getCollection(
      "organizations",
      ({ data, id }) => data.topLevel__id === rootId || id === rootId
    )
  ).map((d) => d.data)

  const roots = getRoots<OrganizationSchema>(await allCommunityOrganizations())
  console.log({ orgs, roots })
  return rollupUniquePeopleCountSum(roots[0])
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

// export const organizationsItemRoots = async () => {
//   const items = (await getCollection("organizations")).map((d) => d.data)
//
//   return getOrganizationsRoots(items)
// }
//
// export const getOrganizationsRoots = (items: OrganizationSchema[]) => {
//   return getRoots<OrganizationSchema>(items)
// }

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
