import { csv2json } from "csv42"
import fs from "node:fs"
import path from "node:path"
import YAML from "yaml"
import filenamify from "filenamify"

fs.rmSync(dir, { recursive: true, force: true })

const rawData = () => {
  return fetch(
    "https://befide.getgrist.com/api/docs/vGtqDxisUdjkKYGmpzAkDj/download/csv?tableId=Taxonomy_items",
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
}

const data = await rawData()

data.forEach((d) => {
  const fileName = filenamify(d.id)

  const result = {
    id: d.id,
    parent_id: d.parent_id,
    term: d.term,
    definition: d.definition,
    abbreviations: d.abbreviations,
    synonyms: d.synonyms,
    review: d.review,
  }
  const markdown = "---\n" + YAML.stringify(result) + "---\n"
  console.log(markdown)
})
// fs.writeFileSync(
//   path.join("./src/data/zotero/kfb_theses.json"),
//   JSON.stringify(items, null, 2),
//   "utf8"
// )
//
// //
// try {
//   fs.writeFileSync(
//     path.join("./src/data/zotero/kfb_bf2035.json"),
//     JSON.stringify(flattenedItems, null, 2),
//     "utf8"
//   )
//   console.log("Data successfully saved to disk")
// } catch (error) {
//   console.log("An error has occurred ", error)
// }
