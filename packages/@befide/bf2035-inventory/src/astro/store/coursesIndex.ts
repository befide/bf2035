import { computed } from "nanostores"
import { $courses } from "./courses"
import crossfilter from "crossfilter2"

export const $coursesIndex = computed($courses, (courses) => {
  // console.log(theses)
  return crossfilter(courses)
})
