// @ts-check
import { defineConfig } from "astro/config"

import starlight from "@astrojs/starlight"

import astroD2 from "astro-d2"
import type { ManifestOptions } from "vite-plugin-pwa"
import manifest from "./webmanifest.json"

import AstroPWA from "@vite-pwa/astro"

import { purgecss } from "@zokki/astro-purgecss"

import rehypeRewrite from "rehype-rewrite"
import rehypeWidont from "rehype-widont"

import sectionize from "remark-sectionize"
import remarkDirective from "remark-directive"
import spaceCommander from "./src/astro/utils/space-commander.ts"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  experimental: {
    contentIntellisense: true,
  },
  site:
    process.env.NODE_ENV === "production"
      ? "https://bf2035-meta.beschleunigerphysik.de"
      : "https://bf2035-meta.beschleunigerphysik.de",
  vite: { plugins: [tailwindcss()] },
  markdown: {
    remarkPlugins: [
      remarkDirective,
      // myRemarkPlugin,
      // remarkNumberedFootnotes,
      sectionize,
      //   [smartypants, {
      //     options: {
      //       openingQuotes: { double: "»", single: "›" },
      //       closingQuotes: { double: "«", single: "‹" },
      //     }
      //   }],
    ],
    rehypePlugins: [
      [rehypeWidont, {}],
      // [rehypeFigure, { className: "md" }],
      // [
      //   rehypeCitation,
      //   {
      //     bibliography: 'src/kfb_bf2035__used.csl.json',
      //     linkCitations: true,
      //   },
      // ],

      // [
      //   rehypeAddClasses,
      //   {
      //     'img,figure,table,section,h1,h2,h3,h4,p,ol,ul,li,blockquote': 'md',
      //   },
      // ],
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
      // defaultLocale: "en",
      // locales: {
      //   en: { label: "English" },
      //   de: { label: "Deutsch", lang: "de" },
      // },
      title: "BF2035 Meta",
      disable404Route: true,
      components: {
        Sidebar: "@components/Sidebar.astro",
        SidebarSublist: "@components/SidebarSublist.astro",
        Header: "@components/Header.astro",
      },

      customCss: [
        "@/astro/styles/global.css",
        "@fontsource/barlow-semi-condensed/400.css",
        "@fontsource/barlow-semi-condensed/700.css",
      ],

      plugins: [
        // starlightUtils({
        // 	multiSidebar: {
        // 		switcherStyle: 'horizontalList',
        // 	},
        // }),
      ],
      sidebar: [
        // A topic representing a guide section of your project.
        {
          label: "Project",
          collapsed: true,
          // autogenerate: { directory: "/project" },
          // icon: 'open-book',
          // The page to link to when the topic is clicked.

          // The sidebar configuration for the topic.
          items: [
            {
              label: "Introduction",
              link: "/project/",
            },
            {
              label: "Initial Situation",
              autogenerate: { directory: "/project/01-initial-situation" },
            },
            {
              label: "Methodology",
              items: [
                { label: "Introduction", link: "/project/02-methodology/" },
                {
                  label: "Analysis",
                  autogenerate: { directory: "/project/02-methodology/01-analysis/" },
                },
                {
                  label: "Content Planning",
                  autogenerate: { directory: "/project/02-methodology/02-content-plannning/" },
                },
                {
                  label: "Content Creation",
                  autogenerate: { directory: "/project/02-methodology/03-content-creation/" },
                },
                {
                  label: "Approval and Engagement",
                  autogenerate: {
                    directory: "/project/02-methodology/04-approval-and-engagement/",
                  },
                },
              ],
            },
            {
              label: "Deliverables",

              autogenerate: { directory: "/project/03-deliverables" },
            },
          ],
        },
        {
          label: "Profiles",
          collapsed: true,

          // icon: 'open-book',
          // The page to link to when the topic is clicked.
          // link: 'profiles',
          // The sidebar configuration for the topic.
          items: [
            { label: "Index", link: "profiles/en/" },
            {
              label: "CERN",
              link: "/profiles/en/:cern",
            },
            {
              label: "CFEL",
              link: "/profiles/en/:cfel",
            },
            {
              label: "DESY",
              link: "/profiles/en/:desy",
            },
            {
              label: "ESRF",
              link: "/profiles/en/:esrf",
            },
            {
              label: "ESS",
              link: "/profiles/en/:ess",
            },
            {
              label: "eu.XFEL",
              link: "/profiles/en/:eu-xfel",
            },
            {
              label: "FAIR",
              link: "/profiles/en/:fair",
            },
            {
              label: "FEP",
              link: "/profiles/en/:fep",
            },
            {
              label: "FZJ",
              link: "/profiles/en/:fz-juelich",
            },
            {
              label: "GSI",
              link: "/profiles/en/:gsi",
            },
            {
              label: "HIJ",
              link: "/profiles/en/:hij",
            },
            {
              label: "HIM",
              link: "/profiles/en/:him",
            },
            {
              label: "HU Berlin",
              link: "/profiles/en/:hu-berlin",
            },
            {
              label: "HZB",
              link: "/profiles/en/:hzb",
            },
            {
              label: "HZDR",
              link: "/profiles/en/:hzdr",
            },
            {
              label: "HZG",
              link: "/profiles/en/:hzg",
            },
            {
              label: "KfB",
              link: "/profiles/en/:kfb",
            },
            {
              label: "KIT",
              link: "/profiles/en/:kit",
            },
            {
              label: "MPIK",
              link: "/profiles/en/:mpik",
            },
            {
              label: "MPP",
              link: "/profiles/en/:mpp",
            },
            {
              label: "PTB",
              link: "/profiles/en/:ptb",
            },
            {
              label: "RWTH Aachen",
              link: "/profiles/en/:rwth-aachen",
            },
            {
              label: "TU Darmstadt",
              link: "/profiles/en/:tu-darmstadt",
            },
            {
              label: "TU Dortmund",
              link: "/profiles/en/:tu-dortmund",
            },
            {
              label: "TU Dresden",
              link: "/profiles/en/:tu-dresden",
            },
            {
              label: "Uni Bonn",
              link: "/profiles/en/:uni-bonn",
            },
            {
              label: "HHU",
              link: "/profiles/en/:uni-düsseldorf",
            },
            {
              label: "Uni Erlangen",
              link: "/profiles/en/:uni-erlangen",
            },
            {
              label: "Uni Frankfurt",
              link: "/profiles/en/:uni-frankfurt",
            },
            {
              label: "Uni Göttingen",
              link: "/profiles/en/:uni-goettingen",
            },
            {
              label: "Uni Hamburg",
              link: "/profiles/en/:uni-hamburg",
            },
            {
              label: "Uni Jena",
              link: "/profiles/en/:uni-jena",
            },
            {
              label: "Uni Kassel",
              link: "/profiles/en/:uni-kassel",
            },
            {
              label: "Uni Mainz",
              link: "/profiles/en/:uni-mainz",
            },
            {
              label: "Uni Rostock",
              link: "/profiles/en/:uni-rostock",
            },
            {
              label: "Uni Siegen",
              link: "/profiles/en/:uni-siegen",
            },
            {
              label: "Uni Wuppertal",
              link: "/profiles/en/:uni-wuppertal",
            },
          ],
        },

        {
          label: "Data",
          collapsed: true,
          // icon: 'database',
          // The page to link to when the topic is clicked.
          // link: '/data/',
          autogenerate: { directory: "/data/" },
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
