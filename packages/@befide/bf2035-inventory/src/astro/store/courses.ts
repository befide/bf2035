import crossfilter from "crossfilter2"
import { computed, task } from "nanostores"
import { $locale } from "./locale"

export const $courses = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/api/" + locale + "/courses.json").then((response) => {
      return response.json()
    })
  }),
)

export const $coursesIndex = computed($courses, (courses) =>
  task(async () => {
    return crossfilter(courses || [])
  }),
)
