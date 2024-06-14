import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
import newsService from '@/services/news.service'
export interface INews {
  id?: number
  title: string
  content: string
  image_url?: string
  date?: Date
  created_at?: string
  updated_at?: string
}

export interface INewsCreate {}

export const useNewsStore = defineStore({
  id: 'news',
  state: () => ({
    news: [] as INews[] | [],
    new: {} as INews,
    total: 0,
  }),
  actions: {
    async getNews(params: Iparams): Promise<void> {
      const data = await newsService.getNews(params)
      this.news = data.data
      this.total = data.meta.itemCount
    },

    async createNews(product: INews) {
      const data = await newsService.createNews(product)
    },
    async updateNews(product: INews) {
      const data = await newsService.updateNews(product)
    },
    async deleteNews(product: INews) {
      const data = await newsService.deleteNews(product)
    },
    async getNew(id: number) {
      const data = await newsService.getOneNews(id)
      this.new = data
    },
  },
})
