import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zeddy",
  description: "A Convenient Framework",
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
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/en/markdown-examples' },
            { text: 'Runtime API Examples', link: '/en/api-examples' }
          ]
        }
      ],
      '/zh/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/zh/markdown-examples' },
            { text: 'Runtime API Examples', link: '/zh/api-examples' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
