// @ts-check
import { defineConfig } from "astro/config"

import starlight from "@astrojs/starlight"

import astroD2 from "astro-d2"
import type { ManifestOptions } from "vite-plugin-pwa"
import manifest from "./webmanifest.json"

import AstroPWA from "@vite-pwa/astro"

import { purgecss } from "@zokki/astro-purgecss"

import rehypeRewrite from "rehype-rewrite"

import sectionize from "remark-sectionize"
import remarkDirective from "remark-directive"
import spaceCommander from "./src/astro/utils/space-commander.ts"
import tailwindcss from "@tailwindcss/vite"
import UnpluginUnused from "unplugin-unused/vite"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentIntellisense: true,
  },
  site:
    process.env.NODE_ENV === "production"
      ? "https://bf2035-meta.beschleunigerphysik.de"
      : "https://bf2035-meta.beschleunigerphysik.de",
  vite: {
    plugins: [
      UnpluginUnused({
        include: [/\.([cm]?[jt]sx?|vue)$/],
        exclude: [/node_modules/],
        level: "warning", // or 'error'
        /**
         * Ignore some dependencies.
         */
        ignore: {
          peerDependencies: ["vue"],
        },
        // Or ignore all kinds of dependencies.
        // ignore: ['vue'],

        /**
         * Dependency kinds to check.
         */
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
          rewrite: (node: any) => {
            if (node.type === "text") {
              node.value = spaceCommander(node.value)
            }
          },
        },
      ],
    ],
  },
  integrations: [
    ...(false && process.env.NODE_ENV === "production" ? [] : [astroD2({ inline: true })]),
    starlight({
      defaultLocale: "en",
      locales: {
        en: { label: "English" },
        de: { label: "Deutsch", lang: "de" },
      },
      title: "BF2035 Meta",
      disable404Route: true,
      components: {
        Sidebar: "@components/Sidebar.astro",
        Header: "@components/Header.astro",
      },

      customCss: [
        "@/astro/styles/global.css",
        "@fontsource/barlow-semi-condensed/400.css",
        "@fontsource/barlow-semi-condensed/700.css",
      ],

      plugins: [],
      sidebar: [
        // A topic representing a guide section of your project.
        {
          label: "Taxonomy",
          link: "/taxonomy",
        },
        {
          label: "Organizations",
          link: "/organizations",
        },
        {
          label: "Facilities",
          link: "/facilities",
        },
        {
          label: "Teaching",
          link: "/teaching",
        },
        {
          label: "Theses",
          link: "/theses",
        },
      ],
    }),
    purgecss(),
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
