import { thesesForeAPI } from "@utils/content.theses";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function GET() {
  const theses = await thesesForeAPI();

  try {
    return new Response(JSON.stringify(theses));
  } catch (error) {
    throw new Error("Something went wrong in json-resource.json route!");
  }
};
