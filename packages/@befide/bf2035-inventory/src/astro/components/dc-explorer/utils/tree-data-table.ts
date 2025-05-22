import treeDataTable from "@components/dc-explorer/dc/dc-tree-data-table"

export const treeDataTableTileId = (collection: string, dimension: string) => {
  return "dc-explorer__tile--" + collection + "-" + dimension
}
export const treeDataTableId = (collection: string, dimension: string) => {
  return "dc-explorer__tree-table--" + collection + "-" + dimension
}

export function createTreeDataTableChart(
  collection: string,
  dimension: string,
  tableHeaderConfig: any,
  cfDimension: any
) {
  const tileElementIdSelector = "#" + treeDataTableTileId(collection, dimension)
  const chartElementIdSelector = "#" + treeDataTableId(collection, dimension)

  const treeDataTableChart = treeDataTable(chartElementIdSelector)
  // createTableHeader()

  treeDataTableChart
    .allEntries(cfDimension.filter().bottom(Infinity))
    .dimension(cfDimension)
    .showSections(false)
    // .section("parent_id")
    .size(Infinity)
    .columns(tableHeaderConfig)

  treeDataTableChart.render()

}
