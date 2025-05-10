import { format, scaleLinear, select } from "d3"
import { barChart, dataCount, rowChart } from "dc"

export const charts = new Map<String, any>()
export const baselineHeight = 20
export const filterWidth = 250

export const rowBarRatio = 0.9

export const getLocale = () => (document.location.href.indexOf("/de/") > -1 ? "de" : "en")

export const margins = {
  top: 0 * baselineHeight,
  right: baselineHeight,
  bottom: 1 * baselineHeight,
  left: baselineHeight,
}

export function createCountChart(id: string, idx) {
  const containerElement = document.getElementById("filter--" + id)
  const chart = dataCount("#chart--" + id)
    .crossfilter(idx)
    .groupAll(idx.groupAll())
  return chart
}

export function createRowChart(id: string, dimension: any, group: any) {
  const containerElement = document.getElementById("filter--" + id)
  const height = (group.all().length + 1) * baselineHeight
  const chart = rowChart("#chart--" + id)
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
    .dimension(dimension)
    .group(group)
   
    .ordering(function (d) {
      return d.label
    })
    // chart.xAxis().ticks(5).tickSizeInner(-height)
  chart.on("renderlet", () => {
    chart.hasFilter()
      ? containerElement?.classList.add("filtered")
      : containerElement?.classList.remove("filtered")
  })

  charts.set(id, chart)
  return chart
}

export function createBarChart(id: string, dimension: any, group: any) {
  const allYears = group
    .top(Infinity)
    .map((y) => +y.key)
    // .filter((y) => y !== "")
    .sort()

  const containerElement = document.getElementById("chart--" + id)?.parentElement?.parentElement
  const chart = barChart("#chart--" + id)
    .x(
      scaleLinear().domain([(allYears[0] || 0) - 0, (allYears[allYears.length - 1] || 2000) + 0.5]),
    )
    .width(filterWidth)
    .height(5 * baselineHeight)
    .elasticY(false)
    .elasticX(false)
    .centerBar(true)
    .dimension(dimension)
    .group(group)
    .margins({
      ...margins,
      bottom: 1 * baselineHeight,
      // left: 1 * baselineHeight,
    })
    .renderHorizontalGridLines(true)

    .on("renderlet", () => {
       const lineOpacity = select(".grid-line line").attr("opacity")
       select("#lineOpacity span").html(lineOpacity)
      chart.hasFilter()
        ? containerElement?.classList.add("filtered")
        : containerElement?.classList.remove("filtered")
    })

  chart.xAxis().ticks(4).tickFormat(format("2"))
  chart.yAxis().ticks(2)

  charts.set(id, chart)
  return chart
}
