import { getCollection, type CollectionEntry } from 'astro:content'

import { getRoots, type TreeNode } from './content.tree'
import {
  peopleCountDiscriminators,
  type Organization
} from '@/content.config.organizations'
import { get } from '.'

export const getOrganizations = async (topLevelOrganizationId?: string) =>
  (await getCollection('organizations'))
    .filter(
      (d) =>
        topLevelOrganizationId === undefined ||
        d.data.hasTopLevelOrganization?.id === topLevelOrganizationId ||
        d.id === topLevelOrganizationId ||
        d.id === ':'
    )
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((d) => d.data)

export const getCommunityOrganizations = async () => {
  return (await getOrganizations()).filter((d) => d.isPartOfCommunity)
}

export const getCommunityTopLevelOrganizations = async () => {
  return (await getCommunityOrganizations())
    .filter(
      (d) =>
        d.isPartOfCommunity &&
        !d.hasTopLevelOrganization &&
        d.befideOrganizationCategories.indexOf('committee') !== 0
    )
    .sort((a, b) => a.label.short.en?.localeCompare(b.label.short.en))
}

export const getOrganizationCategories = async () =>
  Array.from(
    new Set(
      (await getCommunityTopLevelOrganizations()).flatMap(
        (orga) => orga.befideOrganizationCategories
      )
    )
  )

function rollupUniquePeopleCountSum(node: TreeNode<Organization>) {
  if (node.children.length === 0) {
    node.data.uniquePeopleCountRecursiveSum = {
      total: node.data.uniquePeopleCountSum.total,
      ...Object.fromEntries(
        peopleCountDiscriminators.map((d) => [
          d,
          get(node.data.uniquePeopleCountSum, d)
        ])
      )
    }
  } else {
    node.children.forEach((child) => rollupUniquePeopleCountSum(child))
    node.data.uniquePeopleCountRecursiveSum = {
      total: node.children.reduce(
        (sum, child) =>
          sum + get(child.data.uniquePeopleCountRecursiveSum, 'total'),
        get(node.data.uniquePeopleCountSum, 'total')
      ),
      ...Object.fromEntries(
        peopleCountDiscriminators.map((d) => [
          d,
          node.children.reduce(
            (sum, child) =>
              sum + get(child.data.uniquePeopleCountRecursiveSum, d),
            get(node.data.uniquePeopleCountSum, d)
          )
        ])
      )
    }
  }
}

export const getOrganizationRoots = (organizations: Organization[]) => {
  const roots = getRoots<Organization>(organizations)
  rollupUniquePeopleCountSum(roots[0])

  return roots
}
