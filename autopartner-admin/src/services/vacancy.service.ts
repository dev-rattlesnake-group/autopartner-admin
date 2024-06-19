import type { IVacancy } from '@/stores/vacancy.store'
import { authHeader } from './auth-header.service'
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

export default new (class VacancyService {
  async get(params: object): Promise<{ data: IVacancy[] | []; meta: any }> {
    try {
      const { data } = await axios.get(API_URL + '/vacancies', {
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
      const { data } = await axios.get(API_URL + '/vacancies/' + id, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async create(productDto: IVacancy) {
    try {
      const { data } = await axios.post(API_URL + '/vacancies', productDto, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async update(productDto: IVacancy) {
    try {
      const { data } = await axios.put(
        API_URL + '/vacancies/' + productDto.id,
        productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async delete(productDto: IVacancy) {
    try {
      const { data } = await axios.delete(
        API_URL + '/vacancies/' + productDto.id,
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
