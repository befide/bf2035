import { defineConfig } from "astro/config"
import starlightThemeObsidian from "starlight-theme-obsidian"
import starlightImageZoom from "starlight-image-zoom"

import starlight from "@astrojs/starlight"

import astroD2 from "astro-d2"
import type { ManifestOptions } from "vite-plugin-pwa"
import manifest from "./webmanifest.json"

import AstroPWA from "@vite-pwa/astro"

// import { purgecss } from "@zokki/astro-purgecss"

import rehypeRewrite from "rehype-rewrite"

import sectionize from "remark-sectionize"
import remarkDirective from "remark-directive"
import spaceCommander from "./src/astro/domain/space-commander.ts"
import tailwindcss from "@tailwindcss/vite"
import UnpluginUnused from "unplugin-unused/vite"
import type { Root, RootContent } from "hast"
import starlightAutoSidebar from "starlight-auto-sidebar"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: true,
  },
  experimental: {
    contentIntellisense: true,
  },
  site:
    process.env.NODE_ENV === "production"
      ? "https://inventory.beschleunigerphysik.de"
      : "https://inventory.beschleunigerphysik.de",
  vite: {
    plugins: [
      UnpluginUnused({
        include: [/\.([cm]?[jt]sx?|vue)$/],
        exclude: [/node_modules/],
        level: "warning", // or 'error'
        depKinds: ["dependencies", "peerDependencies"],
      }),
      tailwindcss(),
    ],
  },
  markdown: {
    remarkPlugins: [remarkDirective, sectionize],
    rehypePlugins: [
      [
        rehypeRewrite,
        {
          rewrite: (node: Root | RootContent) => {
            if (node.type === "text") {
              node.value = spaceCommander(node.value)
            }
          },
        },
      ],
    ],
  },
  integrations: [
    ...(process.env.NODE_ENV === "production"
      ? []
      : [astroD2({ inline: true })]),
    starlight({
      markdown: {
        headingLinks: false,
      },
      plugins: [
        starlightAutoSidebar(),
        starlightThemeObsidian({}),
        starlightImageZoom({
          // Configuration options go here.
        }),
      ],

      pagefind: false,
      // defaultLocale: "root",
      // locales: {
      //   root: {
      //     label: "English",
      //     lang: "en", // lang is required for root locales
      //   },

      //   de: { label: "Deutsch", lang: "de" },
      // },
      title: "Community Inventory",
      disable404Route: true,
      tableOfContents: false,

      social: [
        // {
        //   icon: "github",
        //   label: "GitHub",
        //   href: "https://github.com/withastro/starlight",
        // },
      ],
      components: {
        // Override the theme's `Sidebar` component.
        Sidebar: "./src/astro/overrides/Sidebar.astro",
        MarkdownContent: "./src/astro/overrides/MarkdownContent.astro",
        Header: "./src/astro/overrides/Header.astro",
        PageFrame: "./src/astro/overrides/PageFrame.astro",
        Pagination: "./src/astro/overrides/Pagination.astro",
      },

      customCss: [
        "@/astro/styles/global.css",
        "@fontsource/barlow-semi-condensed/400.css",
        "@fontsource/barlow-semi-condensed/700.css",
        "@fontsource/barlow-condensed/400.css",
        "@fontsource/barlow-condensed/700.css",
      ],

      // plugins: [starlightFullViewMode({ rightSidebarEnabled: true, leftSidebarExpandedWidth: "200px" })],
      sidebar: [
        // A topic representing a guide section of your project.
        {
          label: "About",
          autogenerate: { directory: "about" },
        },
        {
          label: "Data",
          autogenerate: { directory: "data" },
          // items: [
          //   {
          //     label: "Taxonomy",
          //     link: "/data/taxonomy",
          //   },
          //   {
          //     label: "Organization",
          //     items: [
          //       {
          //         label: "Institutions",
          //         link: "/data/02-organization/institutions",
          //       },
          //       {
          //         label: "Work groups",
          //         link: "/data/02-organization/institions",
          //       },
          //       {
          //         label: "People",
          //         link: "/data/02-organization/people",
          //       },
          //     ],
          //   },
          //   {
          //     label: "Community",
          //     link: "/data/community",
          //   },
          //   {
          //     label: "Facilities",
          //     link: "/data/facilities",
          //   },
          //   {
          //     label: "Courses",
          //     link: "/data/courses",
          //   },
          //   {
          //     label: "Theses",
          //     link: "/data/theses",
          //   },
          // ],
        },
        {
          label: "Profiles",
          autogenerate: { directory: "/en//data/profiles" },
        },
      ],
    }),
    // purgecss(),
    AstroPWA({
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: "/404",
        ignoreURLParametersMatching: [/./],
        globPatterns: [
          "**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}",
        ],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      mode: "production",
      registerType: "autoUpdate",
      manifest: manifest as Partial<ManifestOptions>,
      showMaximumFileSizeToCacheInBytesWarning: false,
    }),
  ],
})
