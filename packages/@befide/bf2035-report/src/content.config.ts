import { defineReferencesCollection } from '@lib/references/index.ts';
import { defineSectionCollection } from '@lib/sections/index.ts';

export const collections = {
  sections: defineSectionCollection,
  references: defineReferencesCollection,
};
