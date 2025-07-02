// CSL item types as per the specification
export const CSL_TYPES = [
  "article",
  "article-journal",
  "article-magazine",
  "article-newspaper",
  "bill",
  "book",
  "broadcast",
  "chapter",
  "classic",
  "collection",
  "dataset",
  "document",
  "entry",
  "entry-dictionary",
  "entry-encyclopedia",
  "event",
  "figure",
  "graphic",
  "hearing",
  "interview",
  "legal_case",
  "legislation",
  "manuscript",
  "map",
  "motion_picture",
  "musical_score",
  "pamphlet",
  "paper-conference",
  "patent",
  "performance",
  "periodical",
  "personal_communication",
  "post",
  "post-weblog",
  "regulation",
  "report",
  "review",
  "review-book",
  "software",
  "song",
  "speech",
  "standard",
  "thesis",
  "treaty",
  "webpage",
] as const

export type CslType = (typeof CSL_TYPES)[number]
export const CSL_STANDARD_FIELDS: string[] = [
  "abstract",
  "annote",
  "archive",
  "archive_location",
  "archive-place",
  "authority",
  "call-number",
  "citation-label",
  "collection-title",
  "container-title",
  "container-title-short",
  "dimensions",
  "DOI", // Note: Spec uses DOI, often seen as 'doi' in data.
  "event",
  "event-place",
  "genre",
  "ISBN", // Note: Spec uses ISBN, often seen as 'isbn' in data.
  "ISSN", // Note: Spec uses ISSN, often seen as 'issn' in data.
  "jurisdiction",
  "keyword",
  "language",
  "license",
  "medium",
  "note",
  "original-publisher",
  "original-publisher-place",
  "original-title",
  "page-first",
  "part",
  "PMCID", // Note: Spec uses PMCID, often seen as 'pmcid' in data.
  "PMID", // Note: Spec uses PMID, often seen as 'pmid' in data.
  "publisher",
  "publisher-place",
  "references",
  "reviewed-title",
  "scale",
  "source",
  "status",
  "title",
  "title-short",
  "URL", // Note: Spec uses URL, often seen as 'url' in data.
  "year-suffix",
]

export const CSL_NAME_FIELDS: string[] = [
  "author",
  "editor",
  "chair",
  "collection-editor",
  "compiler",
  "composer",
  "container-author",
  "contributor",
  "curator",
  "director",
  "editorial-director",
  "executive-producer",
  "guest",
  "host",
  "interviewer",
  "illustrator",
  "narrator",
  "organizer",
  "original-author",
  "performer",
  "producer",
  "recipient",
  "reviewed-author",
  "script-writer",
  "series-creator",
  "translator",
]
export const CSL_NUMBER_FIELDS: string[] = [
  "chapter-number",
  "citation-number",
  "collection-number",
  "edition",
  "first-reference-note-number",
  "issue",
  "locator",
  "number",
  "number-of-pages",
  "number-of-volumes",
  "page", // Note: 'page' is both standard and number.
  "part-number",
  // 'printing-number', // Not in CSL 1.0.2 spec
  "section",
  // 'supplement-number', // Not in CSL 1.0.2 spec
  "version",
  "volume",
]
export const CSL_DATE_FIELDS: string[] = [
  "accessed",
  "available-date",
  "event-date",
  "issued",
  "original-date",
  "submitted",
]

// Master set of all recognized CSL variables for highlighting
// Create the base set with original case
export const CSL_ALL_CSL_FIELDS: Set<string> = new Set([
  ...CSL_STANDARD_FIELDS,
  ...CSL_NAME_FIELDS,
  ...CSL_NUMBER_FIELDS,
  ...CSL_DATE_FIELDS,
])
export interface Contributor {
  role: string
  /** Given name of the contributor, if available */
  given?: string
  /** Family name of the contributor, if available */
  family?: string
  /** Literal form of the contributor name, if provided */
  literal?: string
  /** Any additional CSL contributor properties (e.g., affiliation, sequence, ORCID) */
  [key: string]: any
}

/**
 * Date parts in CSL format
 */
export interface CslDateParts {
  "date-parts": (number | string)[][]
}

/**
 * Additional field for a citation
 */
export interface AdditionalField {
  type: string
  name: string
  value: any
}

/**
 * CSL-compatible citation data
 */

export interface Citation {
  id: string
  type: CslType
  title: string
  "title-short"?: string
  URL?: string
  DOI?: string
  "container-title"?: string
  publisher?: string
  "publisher-place"?: string
  edition?: string | number
  volume?: string | number
  number?: string | number
  page?: string
  language?: string
  abstract?: string
  issued?: CslDateParts
  year?: string | number
  month?: string | number
  day?: string | number
  author?: Array<{ given?: string; family?: string; literal?: string }>
  editor?: Array<{ given?: string; family?: string; literal?: string }>
  translator?: Array<{ given?: string; family?: string; literal?: string }>
  "container-author"?: Array<{
    given?: string
    family?: string
    literal?: string
  }>
  [key: string]: any // For additional fields
}

/**
 * Options for attaching files to citations
 */
export enum AttachmentType {
  NONE = "none",
  IMPORT = "import",
  LINK = "link",
}

/**
 * Attachment data for a citation
 */
export interface AttachmentData {
  type: AttachmentType
  file?: File // For imported files
  path?: string // For linked files
  filename?: string // For displaying the filename
}
