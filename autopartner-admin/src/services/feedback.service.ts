import { authHeader } from './auth-header.service'
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

import type { IFeedback } from '@/stores/feedback.store'

export default new (class FeedbackService {
  async getFeedbacks(
    params: object
  ): Promise<{ data: IFeedback[] | []; meta: any }> {
    try {
      const { data } = await axios.get(API_URL + '/feedbacks', {
        headers: authHeader(),
        params,
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async createFeedback(productDto: IFeedback) {
    try {
      const { data } = await axios.post(API_URL + '/feedbacks', productDto, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async updateFeedback(productDto: IFeedback) {
    try {
      const { data } = await axios.put(
        API_URL + '/feedbacks/' + productDto.id,
        productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async deleteFeedback(productDto: IFeedback) {
    try {
      const { data } = await axios.delete(
        API_URL + '/feedbacks/' + productDto.id,
        {
          headers: authHeader(),
        }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async getOneFeedback(id: number) {
    try {
      const { data } = await axios.get(API_URL + '/feedbacks/' + id, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async uploadImage(file: any) {
    try {
      const formData = new FormData()
      formData.append('file', file.originFileObj)
      const { data } = await axios.post(API_URL + '/upload/image', formData, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
})()
