import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
    {
        ...defineConfig({
            title: "zeddy",
            description: "A Convenient Framework",
            base: "/doc/",
            ignoreDeadLinks: true,
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
                zh: {
                    label: '中文',
                    lang: 'zh',
                }
            },
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config
                nav: [
                    //   { text: 'Home', link: '/' },
                    //   { text: 'Examples', link: '/en/markdown-examples' }
                ],

                sidebar: {
                    '/en/': [
                        {
                            text: '',
                            items: [
                                { text: 'quick start', link: '/en/quickstart' },
                                {
                                    text: '概念', items: [
                                        { text: 'IoC', link: '/en/concept/ioc.md' },
                                        { text: '模块', link: '/en/concept/module.md' }
                                    ]
                                },
                                {
                                    text: '模块', items: [
                                        {text: 'configx', link: '/en/module/configx'},
                                        {text: 'ginx', link: '/en/module/ginx'}
                                    ]
                                }
                            ]
                        }
                    ],
                    '/zh/': [
                        {
                            text: '',
                            items: [
                                { text: '快速开始', link: '/zh/quickstart' },
                                {
                                    text: '概念', items: [
                                        { text: 'IoC', link: '/zh/concept/ioc.md' },
                                        { text: '模块', link: '/zh/concept/module.md' }
                                    ]
                                },
                                {
                                    text: '模块', items: [
                                        {text: 'configx', link: '/zh/module/configx'},
                                        {text: 'ginx', link: '/zh/module/ginx'}
                                    ]
                                }
                            ]
                        }
                    ],
                },

                socialLinks: [
                    { icon: 'github', link: 'https://github.com/zeddy-go/zeddy' }
                ]
            },
        })
    }
)
