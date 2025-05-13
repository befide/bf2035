import { facilitiesForAPI } from "@/astro/utils/content.facilities"
import type { APIRoute, InferGetStaticPropsType } from "astro"

export async function getStaticPaths(): Promise<any> {
  const locales = ["en", "de"]

  return locales.map((locale) => ({
    params: { locale },
    props: { locale },
  }))
}

export const GET: APIRoute = async ({ params }) => {
  const { locale } = params

  const facilities = await facilitiesForAPI(locale)

  try {
    return new Response(JSON.stringify(facilities, null, 2))
  } catch (e) {
    throw new Error("Something went wrong in json-resource.json route!")
  }
}
