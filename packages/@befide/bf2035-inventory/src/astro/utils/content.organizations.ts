import { getCollection } from "astro:content"

import { flattenTreeNodes, getRoots, type TreeNode } from "./content.tree"
import { type Organization, peopleCountDiscriminators } from "@/content/config.organizations"
import { getValue } from "./index"
import { ascending } from "d3-array"

export const allOrganizations = async () =>
  (await getCollection("organizations")).map(({ data }) => data)

export const allOrganizationsForTopLevelOrganization = async (topLevelOrganizationId: string) => {
  return await getCollection(
    "organizations",
    ({ data, id }) =>
      topLevelOrganizationId === undefined ||
      data.hasTopLevelOrganization?.id === topLevelOrganizationId ||
      id === topLevelOrganizationId ||
      id === ":",
  )
}

export const allCommunityTopLevelOrganizations = async () =>
  await getCollection(
    "organizations",
    (entry) =>
      entry.data.isPartOfCommunity &&
      !entry.data.hasTopLevelOrganization &&
      entry.data.befideOrganizationCategories.indexOf("committee") !== 0,
  )

export const allCommunityOrganizations = async () =>
  (
    await getCollection(
      "organizations",
      (entry) =>
        entry.data.isPartOfCommunity &&
        entry.data.befideOrganizationCategories.indexOf("committee") !== 0,
    )
  ).map((d) => d.data)

export const getOrganizationCategories = async () =>
  Array.from(
    new Set(
      (await allCommunityTopLevelOrganizations()).flatMap(
        (entry) => entry.data.befideOrganizationCategories,
      ),
    ),
  )

export const getOrganizationRoots = (items: Organization[]) => {
  return getRoots<Organization>(items)
}

export function rollupUniquePeopleCountSum(node: TreeNode<Organization>) {
  if (node.children.length === 0) {
    node.data.uniquePeopleCountRecursiveSum = {
      total: node.data.uniquePeopleCountSum.total,
      ...Object.fromEntries(
        peopleCountDiscriminators.map((d) => [d, getValue(node.data.uniquePeopleCountSum, d)]),
      ),
    }
  } else {
    node.children.forEach((child) => rollupUniquePeopleCountSum(child))
    node.data.uniquePeopleCountRecursiveSum = {
      total: node.children.reduce(
        (sum, child) => sum + getValue(child.data.uniquePeopleCountRecursiveSum, "total"),
        getValue(node.data.uniquePeopleCountSum, "total"),
      ),
      ...Object.fromEntries(
        peopleCountDiscriminators.map((d) => [
          d,
          node.children.reduce(
            (sum, child) => sum + getValue(child.data.uniquePeopleCountRecursiveSum, d),
            getValue(node.data.uniquePeopleCountSum, d),
          ),
        ]),
      ),
    }
  }

  return node
}

export const organizationsItemRoots = async () => {
  const items = (await getCollection("organizations")).map((d) => d.data)

  return getOrganizationsRoots(items)
}

export const getOrganizationsRoots = (items: Organization[]) => {
  return getRoots<Organization>(items)
}

export const organizationsForAPI = async (locale: string) => {
  const communityOrganizations = await allOrganizations()

  const roots = getOrganizationRoots(communityOrganizations)

  const communityRoot = roots.find((root) => root.id === ":")
  if (!communityRoot) return []

  const newRoot = rollupUniquePeopleCountSum(communityRoot)

  // console.log(flattenTreeNodes(newRoot.children))

  const list = flattenTreeNodes([newRoot])
    .toSorted((a, b) => ascending(a.id, b.id))
    .map((item) => ({
      id: item.id,

      depth: item.depth,
      height: item.children.length,
      parentId: item.parentId,

      label: item.data.label.fullName[locale],
      label__fullName: item.data.label.fullName[locale],
      label__short: item.data.label.short[locale],
      uniquePeopleCountRecursiveSum: item.data.uniquePeopleCountRecursiveSum,
      befideOrganizationCategories: item.data.befideOrganizationCategories,
      instanceOf: item.data.isInstanceOf.id,
      location__country__code: item.data.location?.country?.code,
      location__city: item.data.location?.city,
    }))

  return list
}
