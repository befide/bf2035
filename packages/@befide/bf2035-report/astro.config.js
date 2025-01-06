import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';

import AstroPWA from '@vite-pwa/astro';
import { purgecss } from '@zokki/astro-purgecss';

import rehypeAddClasses from 'rehype-add-classes';
import rehypeCitation from 'rehype-citation';
// import rehypeFigure from "rehype-figure"
import rehypeRewrite from 'rehype-rewrite';
import rehypeWidont from 'rehype-widont';
import remarkNumberedFootnotes from 'remark-numbered-footnote-labels';
import sectionize from 'remark-sectionize';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import pkg from 'hastscript';
const h = pkg;

console.log({ h });

import spaceCommander from './src/astro/utils/space-commander.ts';

import { dirname, resolve } from 'node:path';

import { fileURLToPath } from 'url';
import pagefind from 'astro-pagefind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.NODE_ENV === 'production'
  ? 'https://bf2035-report.surge.sh/'
  : undefined;

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [resolve(__dirname, 'src/astro/styles/mixins/index.styl')],
        },
      },
    },
  },
  output: 'static',
  // site,
  // site: "https://bf2035-report.surge.sh/",
  // site: "https://bf2035-report.surge.sh/",
  // prefetch: {
  //   defaultStrategy: "viewport",
  // },

  redirects: {},
  markdown: {
    remarkPlugins: [
      remarkDirective,
      myRemarkPlugin,
      remarkNumberedFootnotes,
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

      [
        rehypeAddClasses,
        {
          'img,figure,table,section,h1,h2,h3,h4,p,ol,ul,li,blockquote': 'md',
        },
      ],
      [
        rehypeRewrite,
        {
          rewrite: (node) => {
            if (node.type === 'text') {
              node.value = spaceCommander(node.value);
            }
          },
        },
      ],
    ],
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    AutoImport({
      imports: [
        // Import a component’s default export
        // generates:
        // import A from './src/components/A.astro';

        './src/astro/components/domain/progress-chart/ProgressChart.astro',
        './src/astro/components/domain/FacilityList.astro',
        './src/astro/components/domain/OrganisationList.astro',
        './src/astro/components/domain/StrategySummary.astro',
        './src/astro/components/domain/Teaching.astro',
        './src/astro/components/domain/research-agenda/ResearchAgenda.astro',
        './src/astro/components/domain/research-agenda/ResearchAgendaFacility.astro',

        './src/astro/components/domain/research-agenda/ResearchAgendaObjective.astro',
        './src/astro/components/domain/research-agenda/ResearchAgendaTopic.astro',
        './src/astro/components/domain/research-agenda/ResearchAgendaUserGroup.astro',

        './src/astro/components/domain/Universities.astro',
        './src/astro/components/domain/AccelerationTechnologies.astro',
        './src/astro/components/domain/community-map/CommunityMap.astro',

        './src/astro/components/ui/BibRef.astro',
      ],
    }),
    // tailwind(),
    vue({
      appEntrypoint: '/src/_app.ts',
      reactivityTransform: true,
    }),
    mdx({
      gfm: true,
    }),
    pagefind(), // sitemap({}),

    AstroPWA({
      mode: 'development',
      base: '/',

      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Beschleunigerforschung 2035',
        short_name: 'BF2035',
        theme_color: '#ffffff',
        lang: 'de',
      },
      pwaAssets: {
        config: true,
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        maximumFileSizeToCacheInBytes: 30000000000,
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//],
      },
    }),
    purgecss(),
  ],
  devToolbar: { enabled: false },
});

function myRemarkPlugin() {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
