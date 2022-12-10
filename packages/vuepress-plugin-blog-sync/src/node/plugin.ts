import { createHash } from 'crypto'
import type { Plugin } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import { run } from 'csdnsynchexo'
import fs from 'fs-extra'
import dayjs from 'dayjs'
import traverse from '@babel/traverse'
import parser from '@babel/parser'
import generate from '@babel/generator'
import type { DefaultThemeData, NavbarConfig, NavbarGroup } from '@vuepress/theme-default'
import escape from 'escape-html'
import type { ArticleModel, BlogMetaContext, Options } from './type'

export const blogSyncPlugin = ({ catalog, syncConfig, navbar }: Options): Plugin => {
  const blogMetaContext: BlogMetaContext = {
    tagMap: {},
    categoryMap: {},
  }

  return {
    name: 'sync-plugin',
    onInitialized: async(app) => {
      const list = await run(syncConfig) as ArticleModel[]

      blogMetaContext.tagMap = {}
      blogMetaContext.categoryMap = {}

      for (const item of list) {
        item.hash = createHash('md5').update(item.content).digest('hex')
        item.tags.forEach((tag) => {
          if (!blogMetaContext.tagMap[tag]) {
            blogMetaContext.tagMap[tag] = []
          }
          blogMetaContext.tagMap[tag].push(item)
        })

        item.categories.forEach((category) => {
          if (!blogMetaContext.categoryMap[category]) {
            blogMetaContext.categoryMap[category] = []
          }
          blogMetaContext.categoryMap[category].push(item)
        })
      }

      for (const [categoryName, categoryList] of Object.entries(blogMetaContext.categoryMap)) {
        for (const item of categoryList) {
          const htmlPath = `${app.siteData.base}${categoryName}/${item.title}.html`
          item.path = htmlPath
          const formatDate = dayjs(item.date).format('YYYY-MM-DD')
          app.pages.push(
            await createPage(app, {
              path: htmlPath,
              content: escape(item.content),
              frontmatter: {
                title: item.title,
                date: formatDate,
                categories: item.categories,
                tags: item.tags,
              },
            }),
          )
        }
      }

      if (catalog !== false) {
        const basicPageOptions = {
          path: catalog?.pageOptions?.path || '/',
          frontmatter: catalog?.pageOptions?.frontmatter,
        }
        if (!catalog?.generateContent) {
          app.pages.unshift(
            await createPage(app, {
              ...basicPageOptions,
              content:
                Object.keys(blogMetaContext.categoryMap).reduce<string>((content, k) => {
                  const v = blogMetaContext.categoryMap[k]

                  content += `## ${k}\n\n`
                  v.forEach((x) => {
                    content += `#### [${x.title}](${x.path?.replace(
                      /\s/g,
                      '%20',
                    )})\n\n`
                  })
                  content += '\n\n'

                  return content
                }, ''),
            }),
          )
        }
        else {
          app.pages.unshift(
            await createPage(app, {
              ...basicPageOptions,
              content: catalog.generateContent?.(blogMetaContext),
            }),
          )
        }
      }
    },
    onPrepared: async(app) => {
      if (navbar === false) {
        return
      }

      const file = app.dir.temp('internal/themeData.js')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const themeDataCode = fs.readFileSync(file).toString()
      // 依赖了内部api，随时可能会挂掉
      const ast = parser.parse(themeDataCode, {
        sourceType: 'module',
      })

      const traverseFn: typeof traverse = (traverse as any).default

      traverseFn(ast, {
        VariableDeclarator(bPath) {
          if ((bPath.get('id')?.node as any)?.name !== 'themeData') {
            bPath.skip()
            return
          }
          bPath.traverse({
            StringLiteral(bPath) {
              const str = bPath.node.value
              const preThemeData: DefaultThemeData = JSON.parse(str)

              if (navbar?.custom) {
                preThemeData.navbar = navbar?.custom?.(preThemeData.navbar, blogMetaContext)
              }
              else {
                // Generate default navbar from blogMetaContext
                preThemeData.navbar = preThemeData.navbar ?? []
                for (const [category, item] of Object.entries(blogMetaContext.categoryMap)) {
                  const categoryGroup: NavbarGroup = {
                    text: category,
                    children: item.map(x => x.path!),
                  };
                  (preThemeData.navbar as NavbarConfig).unshift(categoryGroup)
                }
              }

              bPath.node.value = JSON.stringify(preThemeData)
            },
          })
        },
      })
      const generateFn: typeof generate = (generate as any).default
      const result = generateFn(ast)
      fs.writeFileSync(file, result.code)
    },
  }
}
