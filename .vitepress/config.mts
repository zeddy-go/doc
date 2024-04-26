import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zeddy",
  description: "A Convenient Framework",
  base: "zeddydoc",
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en'
    },
    zh: {
      label: 'Chinese',
      lang: 'zh',
      link: '/zh'
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/en/markdown-examples' }
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
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
