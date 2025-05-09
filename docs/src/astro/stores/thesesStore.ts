export type Theses = Thesis[];

export interface Thesis {
  title: string;
  author: Author;
  language: string;
  year: number;
  universityId?: string;
  organizationIds: string[];
  facilityIds: string[];
  degree: string;
}

export interface Author {
  familyName: string;
  givenName: string;
  gender: string;
}
