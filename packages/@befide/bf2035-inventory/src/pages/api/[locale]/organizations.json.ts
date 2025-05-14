import { organizationsForAPI } from "@/astro/utils"

import type { APIRoute, } from "astro"
import { getCollection, getEntry } from "astro:content"

export async function getStaticPaths() {
  const locales = ["en", "de"]

  return locales.map((locale) => ({
    params: { locale },
    props: { locale },
  }))
}

export const GET: APIRoute = async (context) => {
  const { locale } = context.params
  
  

  

  
  const organizations = await organizationsForAPI(locale)

  try {
    return new Response(JSON.stringify(organizations, null, 2))
  } catch (e) {
    throw new Error("Something went wrong in json-resource.json route!")
  }
}
