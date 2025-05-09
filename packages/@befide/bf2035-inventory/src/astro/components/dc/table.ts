import { dataTable } from "dc"
import { ascending, descending } from "d3"

interface TableHeaderConfigEntry {
  label: string
  field_name: string
  sort_state: string
  accessor: any
}

const tableHeaderConfig: TableHeaderConfigEntry[] = [
  {
    label: "University",
    field_name: "university",
    sort_state: "ascending",
    accessor: (d: any) => d.university,
  },
  { label: "Year", field_name: "year", sort_state: "ascending", accessor: (d: any) => d.year },
  {
    label: "language",
    field_name: "language",
    sort_state: "ascending",
    accessor: (d: any) => d.language,
  },
  {
    label: "gender",
    field_name: "gender",
    sort_state: "ascending",
    accessor: (d: any) => d.gender,
  },
  {
    label: "degree",
    field_name: "thesisType",
    sort_state: "descending",
    accessor: (d: any) => d.thesisType,
  },
]

export function createDataTable(id: string, dimension: any, group: any) {
  // const containerElement = document.getElementById("chart--" + id)?.parentElement?.parentElement
  const table = dataTable("#chart--" + id)

  // Programmatically insert header labels for table
  const tableHeader = table.select(".table-header").selectAll("th")

  // Bind data to tableHeader selection.
  tableHeader.data(tableHeaderConfig)

  // enter() into virtual selection and create new <th> header elements for each table column
  tableHeader
    .enter()
    .append("th")
    .text((d: any) => d.label + "xxx") // Accessor function for header titles
    .on("click", tableHeaderCallback)

  function tableHeaderCallback(d: any) {
    // Highlight column header being sorted and show bootstrap glyphicon
    var activeClass = "info"

    table
      .selectAll("th") // Disable all highlighting and icons
      .classed(activeClass, false)
      .selectAll("span")
      .style("visibility", "hidden") // Hide glyphicon

    const activeSpan = table
      .selectAll("th span") // Enable active highlight and icon for active column for sorting
      .classed(activeClass, true) // Set bootstrap "info" class on active header for highlight
      .select("span")
      .style("visibility", "visible")

    // Toggle sort order state to user desired state
    d.sort_state = d.sort_state === "ascending" ? "descending" : "ascending"

    var isAscendingOrder = d.sort_state === "ascending"
    table.order(isAscendingOrder ? ascending : descending).sortBy(function (datum) {
      return datum[d.field_name]
    })

    // Reset glyph icon for all other headers and update this headers icon
    // activeSpan?.node().className = ''; // Remove all glyphicon classes

    // Toggle glyphicon based on ascending/descending sort_state
    activeSpan.classed(
      isAscendingOrder
        ? "glyphicon glyphicon-sort-by-attributes"
        : "glyphicon glyphicon-sort-by-attributes-alt",
      true,
    )

    updateTable()
    // table.redraw()
  }
  // Initialize sort state and sort icon on one of the header columns
  // Highlight "Max Conf" cell on page load
  // This can be done programmatically for user specified column
  // tableHeader.filter((d) { return d.label === "Max Conf"; })
  //     .classed("info", true);

  // tableHeader
  //   .append("span") // For Sort glyphicon on active table headers
  //     .classed("glyphicon glyphicon-sort-by-attributes-alt", true)
  //     .style("visibility", "hidden")
  //   .filter(function(d) { return d.label === "Max Conf"; })
  //     .style("visibility", "visible");

  // ##############################
  // Generate the dc.js table
  // ##############################
  // Create generating functions for each columns

  console.log(tableHeaderConfig.map((entry) => entry.accessor))

  // Pagination implementation inspired by:
  // https://github.com/dc-js/dc.js/blob/master/web/examples/table-pagination.html
  table
    .dimension(dimension)
    .group(group) // Must pass in. Ignored since .showGroups(false)
    .size(Infinity)
    .columns(tableHeaderConfig.map((entry) => entry.accessor))
    .showSections(false)
    .sortBy(function (d) {
      return d.max_conf
    }) // Initially sort by max_conf column
    .order(descending)

  updateTable()
  table.redraw()

  // Data Table Pagination
  var tableOffset = 0,
    tablePageSize = 10

  // updateTable calculates correct start and end indices for current page view
  // it slices and pulls appropriate date for current page from table object
  // Finally, it updates the pagination button states depending on if more records
  // are available
  function updateTable() {
    // Ensure Prev/Next bounds are correct, especially after filters applied to dc charts
    // var totFilteredRecs = group.groupAll().value()
    // // Adjust values of start and end record numbers for edge cases
    // var end =
    //   tableOffset + tablePageSize > totFilteredRecs ? totFilteredRecs : tableOffset + tablePageSize
    // tableOffset =
    //   tableOffset >= totFilteredRecs
    //     ? Math.floor((totFilteredRecs - 1) / tablePageSize) * tablePageSize
    //     : tableOffset
    // tableOffset = tableOffset < 0 ? 0 : tableOffset // In case of zero entries

    // // Grab data for current page from the table object
    // table.beginSlice(tableOffset)
    // table.endSlice(tableOffset + tablePageSize)

    // // Update Table paging buttons and footer text
    // select("span#begin").text(end === 0 ? tableOffset : tableOffset + 1) // Correct for "Showing 1 of 0" bug
    // select("span#end").text(end)
    // select("#Prev.btn").attr("disabled", tableOffset - tablePageSize < 0 ? "true" : null)
    // select("#Next.btn").attr(
    //   "disabled",
    //   tableOffset + tablePageSize >= totFilteredRecs ? "true" : null,
    // )
    // select("span#size").text(totFilteredRecs)

    // table.redraw()
  }

  // Callback function for clicking "Next" page button
  function nextPage() {
    tableOffset += tablePageSize
    updateTable()
  }
  // Callback function for clicking "Prev" page button
  function prevPage() {
    tableOffset -= tablePageSize
    updateTable()
  }
}
