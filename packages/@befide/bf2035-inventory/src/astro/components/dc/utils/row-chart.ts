import { select } from "d3"
import { rowChart } from "dc"
import { baselineHeight, filterWidth, rowBarRatio, margins, charts } from "."

export const rowChartTileId = (collection: string, dimension: string) => {
  return "dc-explorer__tile--" + collection + "-" + dimension
}
export const rowChartId = (collection: string, dimension: string) => {
  return "dc-explorer__row-chart--" + collection + "-" + dimension
}

export function createRowChart(
  collection: string,
  dimension: string,
  cfDimension: any,
  cfGroup: any,
) {
  const tileElementIdSelector = "#" + rowChartTileId(collection, dimension)
  const chartElementIdSelector = "#" + rowChartId(collection, dimension)

  const tileElement = select(tileElementIdSelector)
  const height = (cfGroup.all().length + 1) * baselineHeight
  const chart = rowChart(chartElementIdSelector)
    .width(filterWidth)
    .renderTitleLabel(true)
    .transitionDuration(50)
    .labelOffsetX(baselineHeight * (1 - rowBarRatio))
    .titleLabelOffsetX(filterWidth * rowBarRatio - 0.75 * baselineHeight)
    .title((d) => d.value)
    .label((d) => d.key)
    .margins({ ...margins, left: filterWidth * (1 - rowBarRatio) })
    .height(height)
    .fixedBarHeight(0.75 * baselineHeight)
    .gap(0.25 * baselineHeight)
    .elasticX(false)
    .dimension(cfDimension)
    .group(cfGroup)

    .ordering(function (d) {
      return d.label
    })
  // chart.xAxis().ticks(5).tickSizeInner(-height)
  chart.on("renderlet", () => {
    tileElement.classed("filtered", chart.hasFilter())
  })

  charts.set(rowChartId(collection, dimension), chart)
  return chart
}
