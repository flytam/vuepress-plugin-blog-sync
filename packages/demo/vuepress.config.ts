import { defaultTheme, defineUserConfig } from 'vuepress'
import { blogSyncPlugin } from 'vuepress-plugin-blog-sync'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'vuepress-plugin-blog-sync Demo',
  description: 'Input juejin/csdn/github/etc, output vuepress2 web site',
  base: '/vuepress-plugin-blog-sync/',
  plugins: [
    blogSyncPlugin({
      syncConfig: {
        type: 'juejin',
        userId: '3456520257288974',
      },
    }),
  ],
  theme: defaultTheme({
    navbar: [{
      text: 'Github',
      link: 'https://github.com/flytam/vuepress-plugin-blog-sync',
    }],
  }),
})
