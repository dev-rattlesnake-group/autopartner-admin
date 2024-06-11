import CustomerService from '@/services/customer.service'
import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
export interface ICustomer {
  id: number
  name: string
  company: string
  company_vat: string
  email: string
  phone: string
  status_id: number
  role: 'customer'
  vat: string
  billing_address: string
  delivery_address: string
  created_at: string | Date
  all_orders: string | number
  order_total: string | number
}
export interface ICreateCustomerDto {
  name: string
  company: string
  email: string
  phone: string
  billing_address: string
  delivery_address: string
  vat: string
  company_vat: string
  note: string
}

export const useCustomerStore = defineStore({
  id: 'customers',
  state: () => ({
    customers: [] as ICustomer[] | [],
    customer: null as ICustomer | null,
    activeCustomers: 0,
    inActiveCustomers: 0,
    allOrders: 0,
    totalAmountCustomer:0,
    total: 0,

  }),
  actions: {
    async getCustomers(params: Iparams) {
      const data: { items: ICustomer[] | []; total: number } = await CustomerService.getCustomers(params)
      this.customers = data.items
      this.activeCustomers = data.items.filter(c => c.status_id == 1).length
      this.inActiveCustomers = data.items.filter(c => c.status_id == 2).length
      this.allOrders = data.items.reduce((acc, c) => { return acc + Number(c.all_orders) }, 0)
      this.total = data.total
    },

    async createCustomer(createCustomerDto: ICreateCustomerDto) {
      await CustomerService.createCustomer(createCustomerDto)
    },

    async getCustomer(id: string) {
      const [data] = await CustomerService.getCustomer(id)
      this.customer = data

    }
  }
})
