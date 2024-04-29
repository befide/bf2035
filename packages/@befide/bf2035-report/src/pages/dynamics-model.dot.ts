import type { APIRoute } from "astro";
import { getCausalMapForGraphviz } from "../astro/utils/getCausalMap";

export const GET: APIRoute = async function GET() {
  const dot = await getCausalMapForGraphviz();

  try {
    return new Response(dot, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
  } catch (error) {
    throw new Error("Something went wrong in json-resource.json route!");
  }
};
