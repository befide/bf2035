import { select, selectAll } from "d3"
import { ascending, descending } from "d3-array"
import { dataTable } from "dc"
import type { Thesis } from "./ThesesExplorer.astro"
import type { output } from "astro:schema"
import type { Course } from "@/astro/store/courses"

export const tableTileId = (collection: string, dimension: string) => {
  return "dc-explorer__tile--" + collection + "-" + dimension
}
export const tableId = (collection: string, dimension: string) => {
  return "dc-explorer__table--" + collection + "-" + dimension
}

export function createTableChart(
  collection: string,
  dimension: string,
  tableHeaderConfig: any,
  cfDimension: any,
) {
  const tileElementIdSelector = "#" + tableTileId(collection, dimension)
  const chartElementIdSelector = "#" + tableId(collection, dimension)

  const tableChart = dataTable(chartElementIdSelector)
  createTableHeader()

  tableChart
    .dimension(cfDimension)
    .showSections(false)
    .size(Infinity)
    .columns(tableHeaderConfig.map((entry) => entry.format))

  tableChart.render()
  select(tileElementIdSelector).classed("loading", false)

  function createTableHeader() {
    const tableHeaderTHs = select(chartElementIdSelector + " .table-header").selectAll("th")

    // enter() into virtual selection and create new <th> header elements for each table column
    tableHeaderTHs
      .data(tableHeaderConfig)
      .enter()
      .append("th")
      .classed("sortable", (d) => d.sortable)
      .text((d: any) => d.label) // Accessor function for header titles
      .filter((d) => d.sortable)
      .on("click", tableHeaderCallback)

    function tableHeaderCallback(this: any, d: any) {
      // Highlight column header being sorted and show bootstrap glyphicon

      // sort_state = select(this).attr("class"d.sort_state === "ascending" ? "descending" : "ascending"
      const sortState = select(this).attr("data-sort")
      const newSortState = sortState === "ascending" ? "descending" : "ascending"

      select(chartElementIdSelector + " .table-header")
        .selectAll("th") // Disable all highlighting and icons
        .attr("data-sort", null)

      select(this).attr("data-sort", newSortState)

      const isAscendingOrder = newSortState === "ascending"

      tableChart.order(isAscendingOrder ? ascending : descending).sortBy(function (datum) {
        return datum[d.field_name]
      })

      tableChart.redraw()
      select(tileElementIdSelector).classed("loading", false)
    }
  }
}

export const getTableConfig = (key) => {
  if (key === "theses") {
    return [
      {
        label: "University",
        field_name: "university",
        sortable: true,
        format: function (d: Thesis) {
          return d.university
        },
      },
      {
        label: "Year",
        field_name: "year",
        sortable: true,
        format: function (d: Thesis) {
          return d.year
        },
      },
      {
        label: "Title",
        sortable: false,
        format: function (d: Thesis) {
          return (
            "<div class='name'><span class='givenName'>" +
            d.author.givenName +
            "</span> " +
            "<span class='familyName bold sc'>" +
            d.author.familyName +
            "</span> <span class='gender' data-gender-icon='" +
            d.author.gender +
            "'>(" +
            d.author.gender.substr(0, 1) +
            ")</span></div>" +
            "<div class='title'>" +
            d.title +
            "</div>"
          )
        },
      },
    ]
  } else if (key === "courses") {
    return [
      {
        label: "University",
        field_name: "university",
        sortable: true,
        format: function (d: Course) {
          return d.university
        },
      },
      {
        label: "Title",
        sortable: false,
        format: function (d: Course) {
          return d.title
        },
      },
    ]
  } else {
    return []
  }
}
