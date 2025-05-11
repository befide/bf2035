import type { Crossfilter } from "crossfilter2"
import { dataCount } from "dc"
import type { Thesis } from "./ThesesExplorer.astro"

export const countChartTileId = (collection: string, dimension: string) => {
  return "dc-explorer__tile--count-" + collection + "-" + dimension
}
export const countChartId = (collection: string, dimension: string) => {
  return "dc-explorer__chart--count-" + collection + "-" + dimension
}

export function createCountChart(collection: string, dimension: string, idx: Crossfilter<Thesis>) {
  const countChartSelector = "#" + countChartId(collection, dimension)
  const chart = dataCount(countChartSelector).dimension(idx).group(idx.groupAll())
  return chart
}
