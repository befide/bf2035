// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vue from '@astrojs/vue';
import astroD2 from 'astro-d2';
import type { ManifestOptions } from 'vite-plugin-pwa';
import manifest from './webmanifest.json';
import AstroPWA from '@vite-pwa/astro';

import { purgecss } from '@zokki/astro-purgecss';

import tailwind from '@astrojs/tailwind';
import starlightSidebarTopics from 'starlight-sidebar-topics';

import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

import rehypeMermaid from 'rehype-mermaid';
import addMermaidClass from './src/utils/add-mermaid-classname';

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === 'production'
      ? 'http://bf2035-meta.beschleunigerphysik.de'
      : undefined,
  vite: {
    ssr: {
      noExternal: []
    },
    plugins: [
      // @ts-ignore
      Components({
        resolvers: [PrimeVueResolver()]
      })
    ]
  },
  markdown: {
    // Applied to .md and .mdx files
    rehypePlugins: [addMermaidClass, rehypeMermaid]
  },
  integrations: [
    ...(process.env.NODE_ENV === 'production'
      ? []
      : [astroD2({ inline: true })]),
    tailwind(),
    vue({ appEntrypoint: '/src/main', devtools: true }),
    starlight({
      title: 'BF2035 Meta',
      disable404Route: true,

      components: {
        Head: './src/components/Head.astro',
        Search: './src/components/Search.astro'
      },

      customCss: ['./src/tailwind.css'],
      // Path to your Tailwind base styles:

      plugins: [
        starlightSidebarTopics([
          // A topic representing a guide section of your project.
          {
            label: 'Project',
            icon: 'open-book',
            // The page to link to when the topic is clicked.
            link: '/project/',
            // The sidebar configuration for the topic.
            items: [
              'project/objectives',
              {
                label: 'Methodology',
                autogenerate: { directory: 'project/methodology' }
              },
              {
                label: 'Deliverables',
                autogenerate: { directory: 'project/deliverables' }
              }
            ]
          },
          {
            label: 'Data',
            icon: 'open-book',
            // The page to link to when the topic is clicked.
            link: '/data/',
            // The sidebar configuration for the topic.
            items: [
              {
                label: 'Review Process',
                link: 'data/review-process'
              },
              {
                label: 'Taxonomy',
                link: 'data/taxonomy'
              },
              {
                label: 'Organizations',
                items: [
                  'data/organization/organizations',
                  'data/organization/working-groups'
                ]
              },
              {
                label: 'Facilities',
                items: ['data/facilities/facilities']
              },
              {
                label: 'Teaching',
                items: [
                  'data/teaching/universities',
                  'data/teaching/courses',
                  'data/teaching/theses'
                ]
              }
            ]
          }
          // A topic redirecting to the Starlight documentation.
          // {
          //   label: 'Data',
          //   icon: 'starlight',
          //   // The URL to the external resource to link to.
          //   link: '/data/',
          //   items: [
          //     'data/taxonomy',
          //     'data/organizations',
          //     'data/working-groups'
          //   ]
          // }
        ])
      ]
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false
    }),
    purgecss(),
    AstroPWA({
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: '/404',
        ignoreURLParametersMatching: [/./],
        globPatterns: [
          '**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}'
        ]
      },
      experimental: {
        directoryAndTrailingSlashHandler: true
      },
      mode: 'production',
      registerType: 'autoUpdate',
      manifest: manifest as Partial<ManifestOptions>
    })
  ]
});
