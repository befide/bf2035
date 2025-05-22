import { select } from "d3"
import { rowChart } from "dc"
import { baselineHeight, margins, charts, getChartWidth } from "."
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
  cfGroup: any
) {
  const tileElementIdSelector = "#" + rowChartTileId(collection, dimension)
  const chartElementIdSelector = "#" + rowChartId(collection, dimension)

  const filterWidth = getChartWidth(chartElementIdSelector)

  const tileElement = select(tileElementIdSelector)
  const height = (cfGroup.all().length + 1) * baselineHeight
  const chart = rowChart(chartElementIdSelector)
    .width(filterWidth)
    .height(height)
    .renderTitleLabel(true)
    .transitionDuration(50)
    .labelOffsetX(0.25 * baselineHeight)
    .titleLabelOffsetX(filterWidth - 2.5 * baselineHeight)
    .title((d) => d.value)
    .label((d) => d.key)
    .margins({ ...margins, left: 2 * baselineHeight })

    .fixedBarHeight(baselineHeight - 4)
    .gap(4)
    .elasticX(false)
    .dimension(cfDimension)
    .group(cfGroup)

    .ordering(function (d) {
      return d.label
    })
  // chart.xAx©is().ticks(5).tickSizeInner(-height)
  chart.on("renderlet", () => {
    // const rects = chart
    //   .selectAll("g.row")
    // rects.nodes().forEach(d => {
    //   select(d)
    //     .lower()
    //     .append("rect")
    //     .attr("width", chart.width())
    //     .attr("height", 1)
    // })

    // .attr("height", 1)
    // .attr(
    //   "transform",
    //   `translate(${-2 * baselineHeight},${baselineHeight - 7})`
    // )

    // select(d).lower().append("rect").attr("width", chart.width()).attr("height", 2)

    // rects.enter().append("rect").height(1)
    tileElement.classed("filtered", chart.hasFilter())
  })
  chart.xAxis().ticks(5)

  charts.set(rowChartId(collection, dimension), chart)
  return chart
}
