import { authHeader } from './auth-header.service'
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'
import type { INews } from '@/stores/news.store'

export default new (class NewsService {
  async getNews(params: object): Promise<{ data: INews[] | []; meta: any }> {
    try {
      const { data } = await axios.get(API_URL + '/news', {
        headers: authHeader(),
        params,
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async getOneNews(id: number) {
    try {
      const { data } = await axios.get(API_URL + '/news/' + id, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async createNews(productDto: INews) {
    try {
      const { data } = await axios.post(API_URL + '/news', productDto, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async updateNews(productDto: INews) {
    try {
      const { data } = await axios.put(
        API_URL + '/news/' + productDto.id,
        productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async deleteNews(productDto: INews) {
    try {
      const { data } = await axios.delete(API_URL + '/news/' + productDto.id, {
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
