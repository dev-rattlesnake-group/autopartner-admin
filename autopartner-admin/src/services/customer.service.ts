import { authHeader } from './auth-header.service'
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'
import type { ICreateCustomerDto, ICustomer } from '@/stores/customer.store'

export default new (class CustomerService {
  async getCustomers(
    params: object
  ): Promise<{ data: ICustomer[] | []; meta: any }> {
    try {
      const { data } = await axios.get(API_URL + '/accounts', {
        headers: authHeader(),
        params,
      })

      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async createCustomer(
    createCustomerDto: ICreateCustomerDto
  ): Promise<ICustomer> {
    try {
      const { data } = await axios.post(
        API_URL + '/accounts',
        createCustomerDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async getCustomer(id: string) {
    try {
      const { data } = await axios.get(API_URL + `/accounts/${id}`, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async changePassword(id: number, password: string) {
    try {
      const { data } = await axios.put(
        API_URL + `/accounts/${id}`,
        { password },
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async updateCustomer(id: string, updateCustomerDto: any) {
    try {
      const { data } = await axios.patch(
        API_URL + `/accounts/${id}`,
        updateCustomerDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
})()
