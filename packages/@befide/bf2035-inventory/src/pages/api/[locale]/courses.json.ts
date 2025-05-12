import { coursesForeAPI } from "@/astro/utils/content.courses"
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

  const courses = await coursesForeAPI(locale)

  try {
    return new Response(JSON.stringify(courses, null, 2))
  } catch (e) {
    throw new Error("Something went wrong in json-resource.json route!")
  }
}
