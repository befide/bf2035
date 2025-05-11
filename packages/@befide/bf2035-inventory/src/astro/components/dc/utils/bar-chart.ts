import { select, scaleLinear, format } from "d3"
import { barChart } from "dc"
import { filterWidth, baselineHeight, margins, charts } from "."
import { rowChartId } from "./row-chart"

export const barChartTileId = (collection: string, dimension: string) => {
  return "dc-explorer__tile--" + collection + "-" + dimension
}
export const barChartId = (collection: string, dimension: string) => {
  return "dc-explorer__bar-chart--" + collection + "-" + dimension
}

export function createBarChart(
  collection: string,
  dimension: string,
  cfDimension: any,
  cfGroup: any,
) {
  const tileElementIdSelector = "#" + barChartTileId(collection, dimension)
  const chartElementIdSelector = "#" + barChartId(collection, dimension)

  const allYears = cfGroup
    .top(Infinity)
    .map((y: { key: number }) => +y.key)
    // .filter((y) => y !== "")
    .sort()

  const tileElement = select(tileElementIdSelector)
  const chart = barChart(chartElementIdSelector)
    .x(
      scaleLinear().domain([(allYears[0] || 0) - 0, (allYears[allYears.length - 1] || 2000) + 0.5]),
    )
    .width(filterWidth)
    .height(5 * baselineHeight)
    .elasticY(false)
    .elasticX(false)
    .centerBar(true)
    .dimension(cfDimension)
    .group(cfGroup)
    .margins({
      ...margins,
      bottom: 1 * baselineHeight,
      // left: 1 * baselineHeight,
    })
    .renderHorizontalGridLines(true)

    .on("renderlet", () => {
      tileElement.classed("filtered", chart.hasFilter())
    })

  chart.xAxis().ticks(4).tickFormat(format("2"))
  chart.yAxis().ticks(2)

  charts.set(barChartId(collection, dimension), chart)
  return chart
}
