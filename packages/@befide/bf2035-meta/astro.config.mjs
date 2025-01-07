// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vue from '@astrojs/vue';
import astroD2 from 'astro-d2';
import AstroPWA from '@vite-pwa/astro';
import { purgecss } from '@zokki/astro-purgecss';

import tailwind from '@astrojs/tailwind';
import starlightSidebarTopics from 'starlight-sidebar-topics';

import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === 'production'
      ? 'https://bf2035meta.netlify.app'
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
    remarkPlugins: []
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

      customCss: [
        // Fontsource files for to regular and semi-bold font weights.
        '@fontsource/barlow-semi-condensed/400.css',
        '@fontsource/barlow-condensed/400.css',
        './src/tailwind.css'
      ],
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
                items: ['data/teaching/pos', 'data/teaching/courses']
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
      base: '/',

      injectRegister: 'script-defer',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'BF2035 Meta',
        short_name: 'BF2035 Meta',
        theme_color: '#ffffff',
        lang: 'en'
      },
      pwaAssets: {
        config: true
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        maximumFileSizeToCacheInBytes: 30000000000
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//]
      }
    })
  ]
});
