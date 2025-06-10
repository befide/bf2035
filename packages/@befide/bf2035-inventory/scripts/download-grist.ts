import { csv2json } from "csv42"
import fs from "fs"
import path from "path"
import YAML from "yaml"
import { getRoots } from "./../src/astro/domain/content.tree"

export const genders = ["female", "male", "nonbinary"]
const careerLevels = [
  "professor",
  "seniorResearcher",
  "postDoc",
  "phdStudent",
  "masterStudent",
  "bachelorStudent",
]
const disciplinaryProfessions = ["physicist", "engineer", "other"]
const peopleCountDiscriminators = [
  ...careerLevels,
  ...disciplinaryProfessions,
  ...genders,
]
const __dirname = import.meta.dirname

function slug(d: string) {
  return d
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll(":", "!")
    .replaceAll("/", "__")
    .replaceAll(" ", "-")
    .trim()
}

function stringToArray(d = "") {
  return d ? d.split(/\s?,\s?/).filter((d) => !!d) : []
}

async function doTable(collectionKey, tableId, idMapper, mapper, postprocess) {
  const outputFolder = path.join(
    __dirname,
    "../src/content/domain/",
    collectionKey
  )
  fs.rmSync(outputFolder, { recursive: true, force: true })
  fs.mkdir(outputFolder, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log("Directory created successfully!")
  })

  const data = await fetch(
    "https://befide.getgrist.com/api/docs/vGtqDxisUdjkKYGmpzAkDj/download/csv?tableId=" +
      tableId,
    {
      headers: {
        accept: "text/csv",
        Authorization: "Bearer 839145cf5a7092364d1df58b0908952403ad9657",
      },
    }
  )
    .then((response) => response.text())
    .then((data) => csv2json(data, { nested: true }))
    .catch((error) => console.error("Error:", error))

  if (postprocess) postprocess(data)

  data.forEach((d) => {
    const id = idMapper(d)
    const filePath = path.join(outputFolder, id + ".mdx")

    const result = { slug: id, ...mapper(d) }
    const markdown = "---\n" + YAML.stringify(result) + "---\n"

    console.log("writing file: " + filePath)
    fs.writeFileSync(filePath, markdown)
  })
}

const doCourses = async () =>
  await doTable(
    "courses",
    "Courses",
    (d) => slug(d.university__organizationsId + "/" + d.title.de),
    (d) => ({
      id: slug(d.university__organizationsId + "/" + d.title.de),
      teachingEvent__taxonomyId: d.teachingEvent__taxonomyId,
      university__organizationsId: d.university__organizationsId,
      studyLevels__taxonomyId: stringToArray(d.studyLevels__taxonomyId),
      weeklySemesterHours: d.weeklySemesterHours,
      semesters: stringToArray(d.semesters),
      title: d.title,
      objectives: d.objectives,
      contents: d.contents,
      languages: stringToArray(d.languages),
      partOfProgrammesOfStudy: stringToArray(d.partOfProgrammesOfStudy),
      links: d.links,
      review: d.review,
    })
  )

const doTaxonomy = async () =>
  await doTable(
    "taxonomy-items",
    "Taxonomy_items",
    (d) => slug(d.id),
    (d) => ({
      slug: d.id,
      taxonomyURI: d.taxonomyURI,
      id: d.id,
      parent__id: d.parent__id,
      term: d.term,
      definition: d.definition,
      abbreviations: {
        en: stringToArray(d.abbreviations.en),
        de: stringToArray(d.abbreviations.de),
      },
      synonyms: {
        en: stringToArray(d.synonyms.en),
        de: stringToArray(d.synonyms.de),
      },
      iris: stringToArray(d.iris),

      review: d.review,
    })
  )

const doOrganizations = async () =>
  await doTable(
    "organizations",
    "Organizations",
    (d) => slug(d.id),
    (d) => ({
      slug: d.id,
      id: d.id,
      parent__id: d.parent__id,
      topLevel__id: d.topLevel__id,
      isPartOfCommunity: d.isPartOfCommunity,
      instanceOfs__taxonomyId: stringToArray(d.instanceOfs__taxonomyId),
      befideOrganizationCategories: stringToArray(
        d.befideOrganizationCategories
      ),
      label: d.label,
      description: d.description,
      head: d.head,
      headLiteral: d.headLiteral,
      location: d.location,
      links: d.links,
      uniquePeopleCount: d.uniquePeopleCount,
      uniquePeopleCountSum: d.uniquePeopleCountSum,
      uniquePeopleCountRecursiveSum: d.uniquePeopleCountRecursiveSum,
      review: d.review,
    }),
    (data) => {
      const communityOrganizations = data.filter(
        (d) =>
          d.isPartOfCommunity &&
          d.befideOrganizationCategories.indexOf("committee") !== 0
      )
      const roots = getRoots(communityOrganizations)
      const rolledUpNode = rollupUniquePeopleCountSum(roots[0])
      console.log(rolledUpNode)
    }
  )

const doFacilities = async () =>
  await doTable(
    "facilities",
    "Facilities",
    (d) => slug(d.id),
    (d) => ({
      id: d.id,
      slug: d.id,
      instanceOf__taxonomyId: d.instanceOf__taxonomyId,

      partOf__id: d.partOf__id,
      host__organizationsId: d.host__organizationsId,
      successorOf__id: d.successorOf__id,
      parent__id: d.partOf__id || d.successorOf__id || null,
      isUserFacility: d.isUserFacility,
      isBMBF_FIS: d.isBMBF_FIS,
      label: d.label,
      tagLine: d.tagLine,
      definition: d.definition,
      primaryApplications__taxonomyId: stringToArray(
        d.primaryApplications__taxonomyId
      ),
      secondaryApplications__taxonomyId: stringToArray(
        d.secondaryApplications__taxonomyId
      ),
      lifeCycle: d.lifeCycle,
      parameters: {
        ...d.parameters,
        primaryBeamParticles: stringToArray(d.parameters?.primaryBeamParticles),
        secondaryBeamParticles: stringToArray(
          d.parameters?.secondaryBeamParticles
        ),
      },
      links: d.links,
      references: stringToArray(d.references),
      review: d.review,
    })
  )

await doOrganizations()

function getValue(obj: any, path: string) {
  const pathParts = path.split(".")
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i]! in obj) obj = obj[pathParts[i]!]
    else return
  }
  return obj
}

function rollupUniquePeopleCountSum(node: any) {
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
