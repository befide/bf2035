import { getCollection } from "astro:content"

export async function getCausalMapNodes() {
  return await getCollection("causal-map-nodes")
}
