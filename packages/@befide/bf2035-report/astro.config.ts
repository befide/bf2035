import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import AstroPWA from '@vite-pwa/astro';

import rehypeAddClasses from 'rehype-add-classes';
import rehypeCitation from 'rehype-citation';
// import rehypeFigure from "rehype-figure"
import rehypeRewrite from 'rehype-rewrite';
import rehypeWidont from 'rehype-widont';
import remarkNumberedFootnotes from 'remark-numbered-footnote-labels';
import sectionize from 'remark-sectionize';
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
      [
        rehypeCitation,
        {
          bibliography: 'src/kfb-bf2035_used.csl.json',
          linkCitations: true,
        },
      ],

      [
        rehypeAddClasses,
        {
          'img,figure,table,section,h1,h2,h3,h4,p,ol,ul,li,blockquote': 'md',
        },
      ],
      [
        rehypeRewrite,
        {
          rewrite: (node: any) => {
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
    mdx({
      gfm: true,
    }),
    pagefind(),
    // sitemap({}),

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
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//],
      },
    }),
  ],
  devToolbar: { enabled: false },
});
