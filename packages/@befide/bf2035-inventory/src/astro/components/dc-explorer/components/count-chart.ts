import { format, formatSpecifier, precisionFixed, select } from "d3"
import { numberDisplay } from "dc"

const templates = {
  de: {
    dataCountTemplate__one:
      "<p><span class='main-count'>1</span> <span class='total-count'>%total-count</span></p>",
    dataCountTemplate__some:
      "<p><span class='main-count'>%number</span> <span class='total-count'>%total-count</span></p>",
    dataCountTemplate__none:
      "<p><span class='main-count'>0</span> <span class='total-count'>%total-count</span></p>",
  },
  en: {
    dataCountTemplate__one:
      "<p><span class='main-count'>%number</span> entry of %total-count&nbsp;entries</p>",
    dataCountTemplate__some:
      "<p><span class='main-count'>%number</span> of %total-count&nbsp;entries</p>",
    dataCountTemplate__none:
      "<p><span class='main-count'>None</span> of %total-count&nbsp;entries</p>",
  },
}

const numberFormat = format(
  // @ts-ignore
  Object.assign(formatSpecifier("f"), {
    precision: precisionFixed(0),
  })
)

export const countChartTileId = (collection: string, dimension: string) => {
  return "dc-explorer__tile--count-" + collection + "-" + dimension
}
export const countChartId = (collection: string, dimension: string) => {
  return "dc-explorer__chart--count-" + collection + "-" + dimension
}

export function createCountChart(
  collection: string,
  dimension: string,
  cf: any,
  cfDimension: any,
  cfGroup: any
) {
  const tileElementIdSelector = "#" + countChartTileId(collection, dimension)
  const tileElement = select(tileElementIdSelector)

  // const totalCount = idx.size()
  const countChartSelector = "#" + countChartId(collection, dimension)
  const chart = numberDisplay(countChartSelector)
    .dimension(cf)
    .group(cf.groupAll())
    .valueAccessor((x) => x)
    .html({
      some: templates["en"]["dataCountTemplate__some"].replace(
        /%total-count/,
        cf.size()
      ),
      one: templates["en"]["dataCountTemplate__one"].replace(
        /%total-count/,
        cf.size()
      ),
      none: templates["en"]["dataCountTemplate__none"].replace(
        /%total-count/,
        cf.size()
      ),
    })
    .formatNumber(numberFormat)

  chart.on("renderlet", () => {
    tileElement.classed(
      "filtered",
      cfDimension.top(Infinity).length < cf.size()
    )
  })
  return chart
}
