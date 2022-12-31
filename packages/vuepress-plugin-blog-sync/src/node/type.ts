import type { PageOptions } from '@vuepress/core'
import type { DefaultThemeData } from '@vuepress/theme-default'
import type { run } from 'csdnsynchexo'
import type { ArticleItem } from 'csdnsynchexo/dist/extension/base'

export type SyncConfig = Parameters<typeof run>[0]

export interface Options {
  /**
     * 目录页配置
     * @default true
     */
  catalog?:
  | {
    /**
           * 默认 | 自定义
           */
    type?: 'default' | 'custom'
    pageOptions?: Omit<PageOptions, 'filePath' | 'content'>
    /**
       * 自定义生成目录页
       */
    generateContent?: (categoryMeta: BlogMetaContext) => string | Promise<string>
  }
  | false
  /**
     * 是否根据文章category自动生成navbar
     * 默认主题
     * @default true
     */
  navbar?: {
    custom?: (originNavbarConfig: DefaultThemeData['navbar'], blogMetaContext: BlogMetaContext) => DefaultThemeData['navbar']
  } | false
  syncConfig: SyncConfig | SyncConfig[]
}

export interface ArticleModel extends ArticleItem {
  hash?: string
  path?: string
}

export interface BlogMetaContext {
  tagMap: Record<string, ArticleModel[]>
  categoryMap: Record<string, ArticleModel[]>
}
