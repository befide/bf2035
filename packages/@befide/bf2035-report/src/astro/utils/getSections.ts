import { getCollection, type CollectionEntry } from 'astro:content';
import { type HierarchyNode, stratify } from 'd3-hierarchy';

const sortByPath = (
  s1: CollectionEntry<'sections'>,
  s2: CollectionEntry<'sections'>,
) => getSlug(s1).localeCompare(getSlug(s2));

export function getSlug(section: CollectionEntry<'sections'>) {
  // if (!section?.slug) return;

  let slug = section.id.replace(/\.mdx?/, '/');

  return slug;
}

export function getPath(section: CollectionEntry<'sections'>) {
  return '/' + getSlug(section);
}

export async function getSections() {
  const sections = await getCollection('sections');
  sections.sort(sortByPath);
  return sections;
}

export async function getPrevNext(currentPath = '') {
  const sections = await getSections();

  const currentSectionIndex = sections.findIndex(
    (section) => getPath(section) === currentPath,
  );

  let prevSectionIndex = currentSectionIndex - 1;

  while (
    prevSectionIndex >= 0 &&
    sections[prevSectionIndex]?.data.excludeFromTour
  ) {
    prevSectionIndex--;
  }
  if (prevSectionIndex === -1) prevSectionIndex = sections.length - 1;

  let nextSectionIndex = currentSectionIndex + 1;
  while (
    nextSectionIndex < sections.length &&
    sections[nextSectionIndex]?.data.excludeFromTour
  ) {
    nextSectionIndex++;
  }

  if (nextSectionIndex === sections.length) nextSectionIndex = 0;

  return {
    home: sections.find((s) => !s.data.excludeFromTour),
    prev: sections[prevSectionIndex],
    current: sections[currentSectionIndex],
    next: sections[nextSectionIndex],
  };
}

export type SectionTreeNode = HierarchyNode<CollectionEntry<'sections'>>;

export async function getSectionsTreeRoot(): Promise<SectionTreeNode> {
  const sections = await getSections();

  const filteredSections = sections; // .filter(s => !s.data.excludeFromToc)

  const root = stratify<CollectionEntry<'sections'>>().path((d) => getPath(d))(
    filteredSections,
  );

  return root;
}
