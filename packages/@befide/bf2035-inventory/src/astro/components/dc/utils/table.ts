import { csvFormat, select } from "d3"
import { ascending, descending } from "d3-array"
import { dataTable } from "dc"
import type { Thesis } from "@/astro/store/theses"
import type { Course } from "@/astro/store/courses"
import type { TaxonmomyItem } from "@/astro/store/taxonomy"
import type { Organization } from "@/content/config.organizations"

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
  select(tileElementIdSelector + " .download").on("click", () => {
    // if (select('#download-type input:checked').node().value === 'table') {
    //   // collect the data displayed in the table as an array of arrays
    //   const data = Array.from(
    //     document.querySelector(chartElementIdSelector)?.querySelectorAll('tr')?
    //   ).map(row =>
    //     Array.from(row.querySelectorAll('th, td')).map(c => c.innerText)
    //   );

    //   // convert to a raw string
    //   rawData = csvFormatRows(data);
    // } else {
    // collect the data from Crossfilter
    const data = cfDimension.top(Infinity)

    // convert to raw string
    const rawData = csvFormat(data)
    const fileName = dimension + ".csv"
    const file = new File([rawData], fileName, {
      lastModified: Date.now(),
      type: "text/csv;charset=utf-8",
    })
    const exportUrl = URL.createObjectURL(file)
    window.location.assign(exportUrl)
    URL.revokeObjectURL(exportUrl)
    // const blob = new Blob([rawData], {
    //   type: 'text/csv;charset=utf-8',
    //   filename: dimension + ".csv"
    // });

    // const link=window.URL.createObjectURL(blob);
    // window.location = link;

    // use HTML5 save support viahttps://github.com/eligrey/FileSaver.js
    // saveAs(blob, 'data.csv');
  })
}

export const getTableConfig = (key, locale) => {
  if (key === "taxonomy") {
    return [
     
      {
        label: "Term / definition",
        field_name: "term",
        sortable: true,
        format: function (d: TaxonmomyItem) {
          return (
            "<div data-type='" +
            d.type +
            "' data-depth='" +
            d.depth +
            "'>" +
            d.data.term[locale] +
            "</div>"
          )
        },
      },

      {
        label: "domain?",
        field_name: "isDomainSpecfic",
        sortable: true,
        format: function (d: TaxonmomyItem) {
          return d.isDomainSpecific
        },
      },
    ]
  } else if (key === "theses") {
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
  } else if (key === "organizations") {
    return [
      {
        label: "label",
        field_name: "label",
        sortable: true,
        format: function (d: Organization) {
          return "<div class='fullName bold'>" + d.label__short +"</div>" + "<div class='fullName'>" + d.label__fullName +"</div>"
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
      {
        label: "Art",
        sortable: false,
        format: function (d: Course) {
          return d.instanceOfTeachingEvent
        },
      },
      {
        label: "SWS",
        sortable: true,
        field_name: "sws",
        format: function (d: Course) {
          return d.sws
        },
      },
      {
        label: "Link",
        sortable: false,
        field_name: "link",
        format: function (d: Course) {
          return "<a target='_blank' href=" + d.link + ">Link to university</a>"
        },
      },
    ]
  } else {
    return []
  }
}
