import type { ThesisDto, OrganizationDto } from "@/astro/domain"
import type { CourseDto } from "@/astro/domain/courses/course"
import { numberFormat, oneLineFormat } from "./config"

export const tableConfigMap = (key: string) => {
  if (key === "theses") {
    return [
      {
        label: "Author",
        sortable: false,
        format: function (d: ThesisDto) {
          return `<div class='one-line'><div class='name'><span class='givenName'>${d.author.givenName}</span> <span class='familyName bold sc'>${d.author.familyName}</span></div>`
        },
      },
      {
        label: "Gender",
        className: "gender",
        field_name: "year",
        sortable: true,
        format: function (d: ThesisDto) {
          return `<div class='one-line'><span data-gender-icon='${d.author.gender}'>${d.author.gender}</span></div>`
        },
      },
      {
        label: "Year",
        className: "number",
        field_name: "year",
        sortable: true,
        format: function (d: ThesisDto) {
          return numberFormat(d.year)
        },
      },
      {
        label: "Degree",
        className: "one-line",
        field_name: "degree",
        sortable: true,
        format: function (d: ThesisDto) {
          return oneLineFormat(d.degree)
        },
      },
      {
        label: "Title",
        className: "one-line",
        sortable: false,
        format: function (d: ThesisDto) {
          return "<div class='title one-line'>" + d.title + "</div>"
        },
      },
      {
        label: "University",
        field_name: "university_label",
        sortable: true,
        format: function (d: ThesisDto) {
          return (
            "<div class='name one-line'>" + d.university__label_short + "</div>"
          )
        },
      },
    ]
  } else if (key === "organizations") {
    return [
      {
        label: "short name",
        field_name: "label__short",
        sortable: true,
        format: function (d: OrganizationDto) {
          return `<div class='one-line bold'>${d.label__short}</div>`
        },
      },
      {
        label: "full name",
        field_name: "label__fullName",
        sortable: true,
        format: function (d: OrganizationDto) {
          return `<div class='one-line'>${d.label__fullName}</div>`
        },
      },
      {
        label: "theses",
        field_name: "theses_count",
        className: "number",
        sortable: true,
        format: function (d: OrganizationDto) {
          return numberFormat(d.theses_count)
        },
      },
      {
        label: "sws",
        field_name: "weeklySemesterHours_count",
        className: "number",
        sortable: true,
        format: function (d: OrganizationDto) {
          return numberFormat(d.weeklySemesterHours_count)
        },
      },
      {
        label: "facilties",
        field_name: "facilities_count",
        className: "number",
        sortable: true,
        format: function (d: OrganizationDto) {
          return numberFormat(d.facilities_count)
        },
      },
      {
        label: "user facilties",
        field_name: "userFacilities_count",
        className: "number",
        sortable: true,
        format: function (d: OrganizationDto) {
          return numberFormat(d.userFacilities_count)
        },
      },
    ]
  } else if (key === "courses") {
    return [
      {
        label: "University",
        field_name: "university__label_short",
        sortable: true,
        format: function (d: CourseDto) {
          return oneLineFormat(d.university__label_short)
        },
      },
      {
        label: "Title",
        sortable: false,
        className: "bold",
        field_name: "title",
        format: function (d: CourseDto) {
          return oneLineFormat(d.title)
        },
      },
      {
        label: "Art",
        sortable: false,
        format: function (d: CourseDto) {
          return oneLineFormat(d.teachingEvent__term)
        },
      },
      {
        label: "SWS",
        sortable: true,
        field_name: "sws",
        format: function (d: CourseDto) {
          return numberFormat(d.weeklySemesterHours)
        },
      },
      {
        label: "Semesters",
        sortable: true,
        field_name: "sws",
        format: function (d: CourseDto) {
          return oneLineFormat(d.semesters.join(", "))
        },
      },
      {
        label: "Link",
        sortable: false,
        field_name: "link",
        format: function (d: CourseDto) {
          return (
            "<div class='one-line'><a target='_blank' href=" +
            d.link +
            ">Link</a></div>"
          )
        },
      },
    ]
  } else {
    return []
  }
}
