import { getCollection, type CollectionEntry } from 'astro:content';

import { getRoots, type TreeNode } from './content.tree';
import { peopleCountDiscriminators, type Organization } from '@/content.config.organizations';
import { get } from './index';

export const allOrganizations = (await getCollection(
	'organizations'
)) as CollectionEntry<'organizations'>[];

export const allOrganizationsForTopLevelOrganization = (topLevelOrganizationId: string) =>
	allOrganizations.filter(({ data, id }) => {
		return (
			topLevelOrganizationId === undefined ||
			data.hasTopLevelOrganization?.id === topLevelOrganizationId ||
			id === topLevelOrganizationId ||
			id === ':'
		);
	});

export const allCommunityOrganizations = allOrganizations.filter(
	(entry) => entry.data.isPartOfCommunity
);

export const allCommunityTopLevelOrganizations = allCommunityOrganizations
	.filter(
		(entry) =>
			!entry.data.hasTopLevelOrganization &&
			entry.data.befideOrganizationCategories.indexOf('committee') !== 0
	)
	.sort((a, b) => a.label.short.en?.localeCompare(b.label.short.en));

export const getOrganizationCategories = Array.from(
	new Set(
		allCommunityTopLevelOrganizations.flatMap((entry) => entry.data.befideOrganizationCategories)
	)
);

function rollupUniquePeopleCountSum(node: TreeNode<Organization>) {
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

export const allOrganizationRoots = (organizations: Organization[]) => {
	const roots = getRoots<Organization>(organizations);
	rollupUniquePeopleCountSum(roots[0]);

	return roots;
};
