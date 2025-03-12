import { getCollection } from 'astro:content';

import { getRoots, type TreeNode } from './content.tree';
import { type Organization, peopleCountDiscriminators } from '@/content.config.organizations';
import { get } from './index';

export const allOrganizations = async () => (await getCollection(
	'organizations')).map(({data}) => data);

export const allOrganizationsForTopLevelOrganization =  async (topLevelOrganizationId: string) => {
	return await getCollection(
	'organizations', ({ data, id }) => (
			topLevelOrganizationId === undefined ||
			data.hasTopLevelOrganization?.id === topLevelOrganizationId ||
			id === topLevelOrganizationId ||
			id === ':'
		))
}

export const allCommunityTopLevelOrganizations = async () => await getCollection(
	'organizations', (entry) =>
		entry.data.isPartOfCommunity &&
			!entry.data.hasTopLevelOrganization &&
			entry.data.befideOrganizationCategories.indexOf('committee') !== 0

)
export const getOrganizationCategories = async () => Array.from(
	new Set(
		(await allCommunityTopLevelOrganizations()).flatMap((entry) => entry.data.befideOrganizationCategories)
	)
)

export const getOrganizationRoots = (items: Organization[]) => {
	return getRoots<Organization>(items);
};


export function rollupUniquePeopleCountSum(node: TreeNode<Organization>) {
	if (node.children.length === 0) {
		node.data.uniquePeopleCountRecursiveSum = {
			total: node.data.uniquePeopleCountSum.total,
			...Object.fromEntries(
				peopleCountDiscriminators.map((d) => [d, get(node.data.uniquePeopleCountSum, d)])
			),
		};
	} else {
		node.children.forEach((child) => rollupUniquePeopleCountSum(child));
		node.data.uniquePeopleCountRecursiveSum = {
			total: node.children.reduce(
				(sum, child) => sum + get(child.data.uniquePeopleCountRecursiveSum, 'total'),
				get(node.data.uniquePeopleCountSum, 'total')
			),
			...Object.fromEntries(
				peopleCountDiscriminators.map((d) => [
					d,
					node.children.reduce(
						(sum, child) => sum + get(child.data.uniquePeopleCountRecursiveSum, d),
						get(node.data.uniquePeopleCountSum, d)
					),
				])
			),
		};
	}
}
