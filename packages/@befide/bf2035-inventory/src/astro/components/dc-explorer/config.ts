import type { CourseSchema } from "@/astro/domain/courses"

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
        }
      },

      {
        label: "domain?",
        field_name: "isDomainSpecfic",
        sortable: true,
        format: function (d: TaxonmomyItem) {
          return d.isDomainSpecific
        }
      }
    ]
  } else if (key === "theses") {
    return [
      {
        label: "University",
        field_name: "university_label",
        sortable: true,
        format: function (d: Thesis) {
          return d.university_label
        }
      },
      {
        label: "Year",
        field_name: "year",
        sortable: true,
        format: function (d: Thesis) {
          return d.year
        }
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
        }
      }
    ]
  } else if (key === "organizations") {
    return [
      {
        label: "label",
        field_name: "label",
        sortable: true,
        format: function (d: Organization) {
          return (
            "<div class='fullName bold'>" +
            d.label__short +
            "</div>" +
            "<div class='fullName'>" +
            d.label__fullName +
            "</div>"
          )
        }
      }
    ]
  } else if (key === "courses") {
    return [
      {
        label: "University",
        field_name: "university_label",
        sortable: true,
        format: function (d) {
          return d.university_label
        }
      },
      {
        label: "Title",
        sortable: false,
        format: function (d: Course) {
          return d.title
        }
      },
      {
        label: "Art",
        sortable: false,
        format: function (d: Course) {
          return d.teachingEventTaxon_label
        }
      },
      {
        label: "SWS",
        sortable: true,
        field_name: "sws",
        format: function (d: Course) {
          return d.weeklySemesterHours
        }
      },
      {
        label: "Link",
        sortable: false,
        field_name: "link",
        format: function (d: Course) {
          return "<a target='_blank' href=" + d.link + ">Link to university</a>"
        }
      }
    ]
  } else {
    return []
  }
}

export const getTreeTableConfig = (key, locale) => {
  if (key === "taxonomy") {
    return [
      {
        label: "Label",
        format: (d) => {
          return (
            "<span class='tree-node__label'>" +
            d.data.label +
            "</span>" +
            (d.data.definition
              ? "<span class='tree-node__definition'>" +
                  d.data.definition || "" + "</span>"
              : "")
          )
        }
      }
    ]
  } else if (key === "community") {
    return [
      {
        label: "Label",
        className: "tree-node__label",
        format: (d) => d.data.label
      },
      {
        label: "Label",
        className: "tree-node__value",
        format: (d) => d
      }
    ]
  } else if (key === "facilities") {
    return [
      {
        label: "Label",
        format: (d) => {
          return (
            "<span class='tree-node__label'>" +
            d.data.label +
            "</span>" +
            "<span class='tree-node__operation'>(" +
            [d.data.operation_startYear || "", 
            d.data.operation_endYear || ""].join(" - ") +
            ")</span>" +
            (d.data.tagLine
              ? "<span class='tree-node__definition'>" + d.data.tagLine + "</span>"
              : "")
          )
        }
      }
    ]
  } else {
    return []
  }
}
