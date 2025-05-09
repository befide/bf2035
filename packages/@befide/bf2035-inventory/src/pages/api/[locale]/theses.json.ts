import { thesesForeAPI } from "@utils/content.theses"
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
  const theses = await thesesForeAPI(locale)

  try {
    return new Response(JSON.stringify(theses, null, 2))
  } catch (error) {
    throw new Error("Something went wrong in json-resource.json route!")
  }
}
