// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import astroD2 from 'astro-d2';
import type { ManifestOptions } from 'vite-plugin-pwa';
import manifest from './webmanifest.json';

import AstroPWA from '@vite-pwa/astro';

import { purgecss } from '@zokki/astro-purgecss';

import rehypeMermaid from 'rehype-mermaid';
import addMermaidClass from './src/utils/add-mermaid-classname';

import starlightUtils from '@befide/starlight-utils';

// https://astro.build/config
export default defineConfig({
    site:
        process.env.NODE_ENV === 'production' ? 'http://bf2035-meta.beschleunigerphysik.de' : undefined,
    vite: {
        ssr: {
            noExternal: [],
        },
        
    },
    markdown: {
        // Applied to .md and .mdx files
        rehypePlugins: [addMermaidClass, rehypeMermaid],
    },
    integrations: [
        ...(process.env.NODE_ENV === 'production' ? [] : [astroD2({ inline: true })]),
        starlight({
            defaultLocale: 'en',
            locales: {
                en: { label: 'English' },
                de: { label: 'Deutsche', lang: 'de-DE' },
            },
            title: 'BF2035 Meta',
            disable404Route: true,
            components: {
                Head: '@/components/Head.astro',
                Search: '@/components/Search.astro',
            },

            customCss: [
                
                './src/styles/custom.css',
            ],
            

            plugins: [
                starlightUtils({
                	multiSidebar: {
                		switcherStyle: 'horizontalList',
                	},
                }),
            ],
            sidebar: [
                // A topic representing a guide section of your project.
                {
                    label: 'Project',
                    // icon: 'open-book',
                    // The page to link to when the topic is clicked.
                    slug: 'project',
                    // The sidebar configuration for the topic.
                    items: [
                        { slug: 'project/objectives' },
                        {
                            label: 'Methodology',
                            autogenerate: { directory: '/project/methodology' },
                        },
                        {
                            label: 'Deliverables',

                            autogenerate: { directory: '/project/deliverables' },
                        },
                    ],
                },
                {
                    label: 'Profiles',

                    // icon: 'open-book',
                    // The page to link to when the topic is clicked.
                    // link: 'profiles',
                    // The sidebar configuration for the topic.
                    items: [
                        { label: 'Index', link: 'en/profiles' },
                        {
                            label: 'CERN',
                            link: 'en/profiles/:cern',
                        },
                        {
                            label: 'CFEL',
                            link: '/profiles/:cfel',
                        },
                        {
                            label: 'DESY',
                            link: '/profiles/:desy',
                        },
                        {
                            label: 'ESRF',
                            link: '/profiles/:esrf',
                        },
                        {
                            label: 'ESS',
                            link: '/profiles/:ess',
                        },
                        {
                            label: 'eu.XFEL',
                            link: '/profiles/:eu-xfel',
                        },
                        {
                            label: 'FAIR',
                            link: '/profiles/:fair',
                        },
                        {
                            label: 'FEP',
                            link: '/profiles/:fep',
                        },
                        {
                            label: 'FZJ',
                            link: '/profiles/:fz-juelich',
                        },
                        {
                            label: 'GSI',
                            link: '/profiles/:gsi',
                        },
                        {
                            label: 'HIJ',
                            link: '/profiles/:hij',
                        },
                        {
                            label: 'HIM',
                            link: '/profiles/:him',
                        },
                        {
                            label: 'HU Berlin',
                            link: '/profiles/:hu-berlin',
                        },
                        {
                            label: 'HZB',
                            link: '/profiles/:hzb',
                        },
                        {
                            label: 'HZDR',
                            link: '/profiles/:hzdr',
                        },
                        {
                            label: 'HZG',
                            link: '/profiles/:hzg',
                        },
                        {
                            label: 'KfB',
                            link: '/profiles/:kfb',
                        },
                        {
                            label: 'KIT',
                            link: '/profiles/:kit',
                        },
                        {
                            label: 'MPIK',
                            link: '/profiles/:mpik',
                        },
                        {
                            label: 'MPP',
                            link: '/profiles/:mpp',
                        },
                        {
                            label: 'PTB',
                            link: '/profiles/:ptb',
                        },
                        {
                            label: 'RWTH Aachen',
                            link: '/profiles/:rwth-aachen',
                        },
                        {
                            label: 'TU Darmstadt',
                            link: '/profiles/:tu-darmstadt',
                        },
                        {
                            label: 'TU Dortmund',
                            link: '/profiles/:tu-dortmund',
                        },
                        {
                            label: 'TU Dresden',
                            link: '/profiles/:tu-dresden',
                        },
                        {
                            label: 'Uni Bonn',
                            link: '/profiles/:uni-bonn',
                        },
                        {
                            label: 'HHU',
                            link: '/profiles/:uni-düsseldorf',
                        },
                        {
                            label: 'Uni Erlangen',
                            link: '/profiles/:uni-erlangen',
                        },
                        {
                            label: 'Uni Frankfurt',
                            link: '/profiles/:uni-frankfurt',
                        },
                        {
                            label: 'Uni Göttingen',
                            link: '/profiles/:uni-goettingen',
                        },
                        {
                            label: 'Uni Hamburg',
                            link: '/profiles/:uni-hamburg',
                        },
                        {
                            label: 'Uni Jerna',
                            link: '/profiles/:uni-jena',
                        },
                        {
                            label: 'Uni Kassel',
                            link: '/profiles/:uni-kassel',
                        },
                        {
                            label: 'Uni Mainz',
                            link: '/profiles/:uni-mainz',
                        },
                        {
                            label: 'Uni Rostock',
                            link: '/profiles/:uni-rostock',
                        },
                        {
                            label: 'Uni Siegen',
                            link: '/profiles/:uni-siegen',
                        },
                        {
                            label: 'Uni Wuppertal',
                            link: '/profiles/:uni-wuppertal',
                        },
                    ],
                },

                // {
                // 	label: 'Data',
                // 	// icon: 'open-book',
                // 	// The page to link to when the topic is clicked.
                // 	// link: '/data/',
                // 	// The sidebar configuration for the topic.
                // 	items: [
                // 		// {
                // 		// 	label: 'Review Process',
                // 		// 	link: 'data/review-process',
                // 		// },
                // 		// {
                // 		// 	label: 'Taxonomy',
                // 		// 	link: 'data/taxonomy',
                // 		// },
                // 		// {
                // 		// 	label: 'Organizations',
                // 		// 	items: ['data/organization/organizations', 'data/organization/working-groups'],
                // 		// },
                // 		// {
                // 		// 	label: 'Facilities',
                // 		// 	items: [{ slug: 'data/facilities/facilities' }],
                // 		// },
                // 		// {
                // 		// 	label: 'Teaching',
                // 		// 	items: [
                // 		// 		{ slug: 'data/teaching/universities' },
                // 		// 		{ slug: 'data/teaching/courses' },
                // 		// 		{ slug: 'data/teaching/theses' },
                // 		// 	],
                // 		// },
                // 	],
                // },
            ],
        }),
        purgecss(),
        AstroPWA({
            workbox: {
                skipWaiting: true,
                clientsClaim: true,
                navigateFallback: '/404',
                ignoreURLParametersMatching: [/./],
                globPatterns: [
                    '**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}',
                ],
            },
            experimental: {
                directoryAndTrailingSlashHandler: true,
            },
            mode: 'production',
            registerType: 'autoUpdate',
            manifest: manifest as Partial<ManifestOptions>,
        }),
    ],
});

//   // starlightSidebarTopics([
//   //   // A topic representing a guide section of your project.
//   //   {
//   //     label: 'Project',
//   //     icon: 'open-book',
//   //     // The page to link to when the topic is clicked.
//   //     link: '/project/',
//   //     // The sidebar configuration for the topic.
//   //     items: [
//   //       'project/objectives',
//   //       {
//   //         label: 'Methodology',
//   //         autogenerate: { directory: 'project/methodology' }
//   //       },
//   //       {
//   //         label: 'Deliverables',
//   //         autogenerate: { directory: 'project/deliverables' }
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     label: 'Profiles',
//   //     icon: 'open-book',
//   //     // The page to link to when the topic is clicked.
//   //     link: 'profiles',
//   //     // The sidebar configuration for the topic.
//   //     items: [
//   //       'profiles',
//   //       {
//   //         label: 'Entries',
//   //         autogenerate: { directory: 'profiles/profiles' }
//   //       }
//   //     ]
//   //   },

//   //   {
//   //     label: 'Data',
//   //     icon: 'open-book',
//   //     // The page to link to when the topic is clicked.
//   //     link: '/data/',
//   //     // The sidebar configuration for the topic.
//   //     items: [
//   //       {
//   //         label: 'Review Process',
//   //         link: 'data/review-process'
//   //       },
//   //       {
//   //         label: 'Taxonomy',
//   //         link: 'data/taxonomy'
//   //       },
//   //       {
//   //         label: 'Organizations',
//   //         items: [
//   //           'data/organization/organizations',
//   //           'data/organization/working-groups'
//   //         ]
//   //       },
//   //       {
//   //         label: 'Facilities',
//   //         items: ['data/facilities/facilities']
//   //       },
//   //       {
//   //         label: 'Teaching',
//   //         items: [
//   //           'data/teaching/universities',
//   //           'data/teaching/courses',
//   //           'data/teaching/theses'
//   //         ]
//   //       }
//   //     ]
//   //   }
//   //   // A topic redirecting to the Starlight documentation.
//   //   // {
//   //   //   label: 'Data',
//   //   //   icon: 'starlight',
//   //   //   // The URL to the external resource to link to.
//   //   //   link: '/data/',
//   //   //   items: [
//   //   //     'data/taxonomy',
//   //   //     'data/organizations',
//   //   //     'data/working-groups'
//   //   //   ]
//   //   // }
//   // ])