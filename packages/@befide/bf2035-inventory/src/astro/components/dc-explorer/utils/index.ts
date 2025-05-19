import { select } from "d3"

export * from "./count-chart"
export * from "./bar-chart"
export * from "./row-chart"
export * from "./table"
export * from "./tree-data-table"

export const charts = new Map<string, any>()
export const baselineHeight = 20
export const maxFilterWidth = 250

export const rowBarRatio = 0.9

export const margins = {
  top: 0 * baselineHeight,
  right: 1 * baselineHeight,
  bottom: 1 * baselineHeight,
  left: baselineHeight
}

export const getLocale = () =>
  document.location.href.indexOf("/de/") > -1 ? "de" : "en"

export const getValue = (obj: any, path: string) => {
  if (!obj) return

  const keys = path.split(".")

  return keys.reduce((currentObj, key) => currentObj[key], obj)
}

export const getChartWidth = (containerSelector: any) =>
  Number(select(containerSelector).style("width").slice(0, -2))
