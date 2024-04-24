/* eslint-disable no-undef */
import { tsvParse } from 'd3-dsv'
import fs from 'fs'

const university = 's-dalinac'

const kitDataRaw = fs.readFileSync('./' + university + '.tsv').toString()

const kitData = tsvParse(kitDataRaw).map((d) => {
  const nameSplit = (d.author || '').split(', ')

  const keywords = d.keyword ? d.keyword.split(/\s*;\s*/) : []
  if (d.openaccess) keywords.push('#access:open')
  console.log(d)
  return { ...d, familyName: nameSplit[0], givenName: nameSplit[1], keywords }
})

const template = ({
  author,
  year,
  title,
  language,
  affiliation,
  keywords,
  url,
  fulltextUrl
}) => `---
author: ${author}
year: ${year}
title: >
  ${title}
language: ${language}
affiliation: ${affiliation}
keywords:${keywords.reduce((sum, el) => sum + '\n  - \\#' + el + '', '')}
url: >
  ${url}
fulltext-url: >
  ${fulltextUrl}

---
`

console.log(
  kitData.map((entry) => {
    template(entry)
    fs.writeFileSync(
      `./output/${university}__${
        entry.year
      }__${entry.familyName.toLowerCase().replace(/ /g, '_')}.md`,
      template(entry)
    )
  })
)
