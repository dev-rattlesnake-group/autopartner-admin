import { authHeader } from "./auth-header.service"
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'
import type { ICreateCustomerDto, ICustomer } from "@/stores/customer.store"

export default new class CustomerService {
    async getCustomers(params: object): Promise<{ items: ICustomer[] | []; total: number }> {
        try {
            const { data } = await axios.get(API_URL + '/account', { headers: authHeader(), params })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
    async createCustomer(createCustomerDto: ICreateCustomerDto): Promise<ICustomer> {
        try {
            const { data } = await axios.post(API_URL + '/account', createCustomerDto, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
    async getCustomer(id: string) {
        try {
            const { data } = await axios.get(API_URL + `/account/${id}`, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

}