import { organizationsForAPI } from "@/astro/utils"

import type { APIRoute, } from "astro"

export async function getStaticPaths() {
  const locales = ["en", "de"]

  return locales.map((locale) => ({
    params: { locale },
    props: { locale },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const { locale } = params

  const organizations = await organizationsForAPI(locale)

  try {
    return new Response(JSON.stringify(organizations, null, 2))
  } catch (e) {
    throw new Error("Something went wrong in json-resource.json route!")
  }
}
