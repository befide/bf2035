import { getCollection } from "astro:content"

import type {
  CytoscapeOptions,
  EdgeDefinition,
  NodeDefinition,
} from "cytoscape"

import harmonyPalette from "./../components/domain/harmony-palette.json"

import {
  attribute as _,
  Digraph,
  Subgraph,
  Node,
  Edge,
  toDot,
} from "ts-graphviz"

const harmonyPaletteMapping = {
  "user-facilities": "Green",
  autonomy: "Red",
  community: "Red",
  cooperation__agenda: "Green",
  cooperation: "Green",
  discipline: "Red",
  economy: "Blue",
  excellence: "Orange",
  funding: "Red",
  outrteach: "Purple",
  society: "Purple",
  talent__potentials: "Green",
  talents: "Yellow",
  teaching: "Yellow",
}

export const color = (cluster: string, level = 400) => {
  return harmonyPaletteMapping[cluster]
    ? harmonyPalette[harmonyPaletteMapping[cluster] + "/" + level].$value ||
        "red"
    : "red"
}

// export async function getCausalMapForCytoscape() {
  // const nodes = await getCollection("causal-map-nodes")

  // const clusters = new Set(nodes.map((node) => node.data.cluster))
  // // console.log(new Array(clusters).sort())

  // const edges_positive = nodes.flatMap((source) => {
  //   return (source.data.influences_positively || []).map((target) => [
  //     source.slug,
  //     target.slug,
  //   ])
  // })
  // const edges_negative = nodes.flatMap((source) => {
  //   return (source.data.influences_negatively || []).map((target) => [
  //     source.slug,
  //     target.slug,
  //   ])
  // })

  // // const links = await Promise.all(nodes
  // //   .map(async (node) => {
  // //     return node.data.influences_positively ? [node.slug, await getEntries(node.data.influences_positively)] : [node, []]
  // //   }))

  // nodes
  //   .filter((n) => n.data.type === "action")
  //   .forEach((n, i) => {
  //     const phi = Math.PI / 2 + (-i * Math.PI) / 10
  //     const R = 25
  //     n.data.v3_x = Math.cos(phi) * R
  //     n.data.v3_y = Math.sin(phi) * R
  //   })

  // const lineHeight = 14
  // const cytoscapeNodes: NodeDefinition[] = nodes.map((node) => ({
  //   data: {
  //     id: node.slug,
  //     label: (node.data.title_short || node.data.title).replaceAll("  ", "\n"),
  //     x: node.data.i_x !== undefined ? lineHeight * node.data.i_x : 0,
  //     y: node.data.i_y !== undefined ? -lineHeight * node.data.i_y : 0,
  //     type: node.data.type,
  //     cluster: node.data.cluster,
  //     // parent: node.data.parent?.slug
  //   },
  //   position: {
  //     x: node.data.i_x !== undefined ? lineHeight * node.data.i_x : 0,
  //     y: node.data.i_y !== undefined ? -lineHeight * node.data.i_y : 0,
  //     // x: node.data.v3_x !== undefined ? lineHeight * node.data.v3_x : node.data.i_x !== undefined ? lineHeight * node.data.i_x : 0,
  //     // y: node.data.v3_y !== undefined ? -lineHeight * node.data.v3_y : node.data.i_y !== undefined ? -lineHeight * node.data.i_y : 0
  //   },
  // }))

  // const positiveCytoscapeEdges: EdgeDefinition[] = edges_positive.map(
  //   ([source, target]) => ({
  //     data: {
  //       type: "positive",
  //       source: source as string,
  //       target: target as string,
  //     },
  //   }),
  // )
  // const negativeCytoscapeEdges: EdgeDefinition[] = edges_negative.map(
  //   ([source, target]) => ({
  //     data: {
  //       type: "negative",
  //       source: source as string,
  //       target: target as string,
  //     },
  //   }),
  // )

  // const causalMap: CytoscapeOptions = {
  //   elements: {
  //     nodes: cytoscapeNodes,
  //     edges: [...positiveCytoscapeEdges, ...negativeCytoscapeEdges],
  //   },
  // }

  // return causalMap
// }

export async function getCausalMapForGraphviz(useSubgraphs = true) {
  const nodes = await getCollection("causal-map-nodes")

  const edges_positive = nodes.flatMap((source) => {
    return (source.data.influences_positively || []).map((target) => [
      source.slug,
      target.slug,
    ])
  })
  const edges_negative = nodes.flatMap((source) => {
    return (source.data.influences_negatively || []).map((target) => [
      source.slug,
      target.slug,
    ])
  })

  // const links = await Promise.all(nodes
  //   .map(async (node) => {
  //     return node.data.influences_positively ? [node.slug, await getEntries(node.data.influences_positively)] : [node, []]
  //   }))

  // nodes
  //   .filter((n) => n.data.type === "action")
  //   .forEach((n, i) => {
  //     const phi = Math.PI / 2 + (-i * Math.PI) / 10
  //     const R = 25
  //     n.data.v3_x = Math.cos(phi) * R
  //     n.data.v3_y = Math.sin(phi) * R
  //   })

  // const lineHeight = 14
  // const cytoscapeNodes: NodeDefinition[] = nodes.map((node) => ({
  //   data: {
  //     id: node.slug,
  //     label: (node.data.title_short || node.data.title).replaceAll("  ", "\n"),
  //     x: node.data.i_x !== undefined ? lineHeight * node.data.i_x : 0,
  //     y: node.data.i_y !== undefined ? -lineHeight * node.data.i_y : 0,
  //     type: node.data.type,
  //     cluster: node.data.cluster,
  //     // parent: node.data.parent?.slug
  //   },
  //   position: {
  //     x: node.data.i_x !== undefined ? lineHeight * node.data.i_x : 0,
  //     y: node.data.i_y !== undefined ? -lineHeight * node.data.i_y : 0,
  //     // x: node.data.v3_x !== undefined ? lineHeight * node.data.v3_x : node.data.i_x !== undefined ? lineHeight * node.data.i_x : 0,
  //     // y: node.data.v3_y !== undefined ? -lineHeight * node.data.v3_y : node.data.i_y !== undefined ? -lineHeight * node.data.i_y : 0
  //   },
  // }))

  // const positiveCytoscapeEdges: EdgeDefinition[] = edges_positive.map(
  //   ([source, target]) => ({
  //     data: {
  //       type: "positive",
  //       source: source as string,
  //       target: target as string,
  //     },
  //   }),
  // )
  // const negativeCytoscapeEdges: EdgeDefinition[] = edges_negative.map(
  //   ([source, target]) => ({
  //     data: {
  //       type: "negative",
  //       source: source as string,
  //       target: target as string,
  //     },
  //   }),
  // )

  const clusterMap = new Map<string, Subgraph>()
  const nodeMap = new Map<string, Node>()
  const digraph = new Digraph({})

  nodes
    .filter((n) => n.data.type === "cluster")
    .forEach((c) => {
      const clusterName = "cluster_" + c.slug

      const cluster = new Subgraph(clusterName)
      digraph.addSubgraph(cluster)
      clusterMap.set(clusterName, cluster)
    })

  nodes
    .filter((n) => n.data.type !== "cluster")
    .forEach((n) => {
      const node = new Node(n.slug, {
        [_.label]: (n.data.title_short || n.data.title).replaceAll(" ", "\n"),
        [_.shape]: n.data.type === "action" ? "rect" : "ellipse",
        [_.fillcolor]: color(n.data.cluster),
        [_.style]: "filled",
      })

      if (
        useSubgraphs &&
        n.data.cluster &&
        clusterMap.get("cluster_" + n.data.cluster)
      ) {
        clusterMap.get("cluster_" + n.data.cluster).addNode(node)
      } else {
        digraph.addNode(node)
      }

      nodeMap.set(n.slug, node)
    })

  edges_positive.forEach(([source, target]) => {
    const edge = new Edge([nodeMap.get(source), nodeMap.get(target)])
    digraph.addEdge(edge)
  })
  edges_negative.forEach(([source, target]) => {
    const edge = new Edge([nodeMap.get(source), nodeMap.get(target)], {
      [_.color]: "red",
    })
    digraph.addEdge(edge)
  })

  return toDot(digraph).replaceAll(";", "")
}
