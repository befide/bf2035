import { taxonomyForAPI } from "@/astro/utils"
import { coursesForeAPI } from "@/astro/utils/content.courses"
import type { APIRoute, } from "astro"

export async function getStaticPaths(): Promise<APIRoute> {
  const locales = ["en", "de"]

  return locales.map((locale) => ({
    params: { locale },
    props: { locale },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const { locale } = params

  const taxonomy = await taxonomyForAPI(locale)

  try {
    return new Response(JSON.stringify(taxonomy, null, 2))
  } catch (e) {
    throw new Error("Something went wrong in json-resource.json route!")
  }
}
