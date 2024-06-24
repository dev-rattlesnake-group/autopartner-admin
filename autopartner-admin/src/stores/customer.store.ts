import CustomerService from '@/services/customer.service'
import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
export interface ICustomer {
  id: number
  login: string
  password_hash: string
  role: 'admin' | 'client'
  delivery_address: string
  created_at: string | Date
  all_orders: string | number
  order_total: string | number
}
export interface ICreateCustomerDto {
  login: string
  password: string
}

export const useCustomerStore = defineStore({
  id: 'customers',
  state: () => ({
    customers: [] as ICustomer[] | [],
    customer: null as ICustomer | null,
    total: 0,
  }),
  actions: {
    async getCustomers(params: Iparams) {
      const data = await CustomerService.getCustomers(params)
      console.log({ data })
      this.customers = data.data
      this.total = data.meta.itemCount
    },

    async changePassword(id: number, newPassword: string) {
      await CustomerService.changePassword(id, newPassword)
    },

    async getCustomer(id: string) {
      const [data] = await CustomerService.getCustomer(id)
      this.customer = data
    },

    async createCustomer(dto: ICreateCustomerDto) {
      await CustomerService.createCustomer(dto)
    },
  },
})
