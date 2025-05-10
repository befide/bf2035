export type Theses = Thesis[]

export interface Thesis {
  title: string
  author: Author
  language: string
  year: number
  university: string
  organizations: string[]
  facilities: string[]
  degree: string
}

export interface Author {
  familyName: string
  givenName: string
  gender: string
}

import { atom, onMount, task } from "nanostores"

export const $theses = atom<Thesis[]>([])

onMount($theses, () => {
  task(async () => {
    console.log("fetching json")
    $theses.set(
      await fetch("/api/en/theses.json").then((response) => {
        return response.json()
      }),
    )
  })
})
