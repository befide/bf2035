export type Courses = Course[]

export interface Course {
  title: string
  language: string
  university: string
  degree: string
  link: string
}

import { atom, onMount, task } from "nanostores"

export const $courses = atom<Course[]>([])

onMount($courses, () => {
  task(async () => {
    console.log("fetching courses json")
    $courses.set(
      await fetch("/api/en/courses.json").then((response) => {
        return response.json()
      }),
    )
  })
})
