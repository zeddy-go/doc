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
                    link: '/en/'
                },
                zh: {
                    label: '中文',
                    lang: 'zh',
                    link: '/zh/'
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
                                        { text: '框架模块', link: '/zh/concept/module.md' }
                                    ]
                                },
                                {
                                    text: '框架模块', items: [
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
