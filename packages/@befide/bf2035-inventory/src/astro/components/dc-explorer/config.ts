import type { Organization, OrganizationDto } from "@/astro/domain"
import type { TreeNode } from "@/astro/domain/content.tree"
import type { Facility } from "@/astro/domain/facilities"
import type { TaxonmomyItem } from "@/astro/domain/taxonomy"
import type { ThesisDto } from "@/astro/domain/theses"

export const getTableConfig = (key: string) => {
  // if (key === "taxonomy") {
  //   return [
  //     {
  //       label: "Term / definition",
  //       field_name: "term",
  //       sortable: true,
  //       format: function (d: TaxonmomyItem) {
  //         return (
  //           "<div data-type='" +
  //           d.type +
  //           "' data-depth='" +
  //           d.depth +
  //           "'>" +
  //           d.term  +
  //           "</div>"
  //         )
  //       }
  //     },

  //     {
  //       label: "domain?",
  //       field_name: "isDomainSpecfic",
  //       sortable: true,
  //       format: function (d: TaxonmomyItem) {
  //         return d.isDomainSpecific
  //       }
  //     }
  //   ]
  // } else
  if (key === "theses") {
    return [
      {
        label: "University",
        field_name: "university_label",
        sortable: true,
        format: function (d: ThesisDto) {
          return d.university__label_short
        },
      },
      {
        label: "Year",
        field_name: "year",
        sortable: true,
        format: function (d: ThesisDto) {
          return d.year
        },
      },
      {
        label: "Title",
        sortable: false,
        format: function (d: ThesisDto) {
          return (
            "<div class='name'><span class='givenName'>" +
            d.author.givenName +
            "</span> " +
            "<span class='familyName bold sc'>" +
            d.author.familyName +
            "</span> <span class='gender' data-gender-icon='" +
            d.author.gender +
            "'>(" +
            d.author.gender +
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
        format: function (d: OrganizationDto) {
          return (
            "<div class='fullName bold'>" +
            d.label__short +
            "</div>" +
            "<div class='fullName'>" +
            d.label__fullName +
            d.theses_count +
            "</div>"
          )
        },
      },
      {
        label: "theses",
        field_name: "theses_count",
        sortable: true,
        format: function (d: OrganizationDto) {
          return d.theses_count
        },
      },
      {
        label: "facilties",
        field_name: "facilities_count",
        sortable: true,
        format: function (d: OrganizationDto) {
          return d.facilities_count
        },
      },
    ]
  } else if (key === "courses") {
    return [
      {
        label: "University",
        field_name: "university_label",
        sortable: true,
        format: function (d) {
          return d.university_label
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
          return d.teachingEventTaxon_label
        },
      },
      {
        label: "SWS",
        sortable: true,
        field_name: "sws",
        format: function (d: Course) {
          return d.weeklySemesterHours
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
              ? "<span class='tree-node__definition'>" + d.data.definition ||
                "" + "</span>"
              : "")
          )
        },
      },
    ]
  } else if (key === "community") {
    return [
      {
        label: "Label",
        className: "tree-node__label",
        format: (d: TreeNode<OrganizationDto>) => d.data.label__fullName,
      },
      {
        label: "Label",
        className: "tree-node__value",
        format: (d: TreeNode<Organization>) => d,
      },
    ]
  } else if (key === "facilities") {
    return [
      {
        label: "Label",
        format: (d: TreeNode<Facility>) => {
          return (
            "<span class='tree-node__label'>" +
            d.data.label +
            "</span>" +
            "<span class='tree-node__operation'>(" +
            [
              d.data.operation_startYear || "",
              d.data.operation_endYear || "",
            ].join(" - ") +
            ")</span>" +
            (d.data.tagLine
              ? "<span class='tree-node__definition'>" +
                d.data.tagLine +
                "</span>"
              : "")
          )
        },
      },
    ]
  } else {
    return []
  }
}
