import type { IEvent, IEventDetails } from '@/stores/events.store'
import { authHeader } from './auth-header.service'
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

export default new (class EventService {
  async get(params: object): Promise<{ data: IEvent[] | []; meta: any }> {
    try {
      const { data } = await axios.get(API_URL + '/events', {
        headers: authHeader(),
        params,
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async getOne(id: number) {
    try {
      const { data } = await axios.get(API_URL + '/events/' + id, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async create(productDto: { event: IEvent; event_details: IEventDetails[] }) {
    try {
      const { data } = await axios.post(API_URL + '/events', productDto, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async update(productDto: { event: IEvent; event_details: IEventDetails[] }) {
    try {
      const { data } = await axios.put(
        API_URL + '/events/' + productDto.event.id,
        productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async delete(productDto: IEvent) {
    try {
      const { data } = await axios.delete(
        API_URL + '/events/' + productDto.id,
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
