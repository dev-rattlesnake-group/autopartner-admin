import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
import feedbackService from '@/services/feedback.service'

export interface IFeedback {
  id?: number
  author: string
  content: string
  company?: string
  date: Date
  image_url?: string
  created_at?: string
  updated_at?: string
}

export const useFeedbackStore = defineStore({
  id: 'feedbacks',
  state: () => ({
    feedbacks: [] as IFeedback[] | [],
    feedback: {} as IFeedback,
    total: 0,
  }),
  actions: {
    async getFeedbacks(params: Iparams): Promise<void> {
      const data = await feedbackService.getFeedbacks(params)
      this.feedbacks = data.data
      this.total = data.meta.itemCount
    },

    async createFeedback(product: IFeedback) {
      const data = await feedbackService.createFeedback(product)
    },
    async updateFeedback(product: IFeedback) {
      const data = await feedbackService.updateFeedback(product)
    },
    async deleteFeedback(product: IFeedback) {
      const data = await feedbackService.deleteFeedback(product)
    },
    async getOneFeedback(id: number) {
      const data = await feedbackService.getOneFeedback(id)
      this.feedback = data
    },
  },
})
