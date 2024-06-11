import { authHeader } from "./auth-header.service"
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'
import type { IOrder, IOrderItems } from "@/stores/order.store"
import type { Iparams } from "@/interfaces/params.interface"

export default new class OrderService {
    async getOrders(params: Iparams): Promise<{ items: IOrder[] | []; total: number }> {
        try {
            const { data } = await axios.get(API_URL + '/order', { headers: authHeader(), params })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
    async getOrder(id: number): Promise<IOrder> {
        try {
            const { data } = await axios.get(API_URL + `/order/${id}`, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
    async createOrder(cartId: number): Promise<IOrder> {
        try {
            const { data } = await axios.post(API_URL + '/order', {}, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
    async updateOrderStatus(dto:{status_id: number, id: number}) {
        try {
            const { data } = await axios.put(API_URL + '/order', dto, { headers: authHeader() })
            return data

        } catch (error) {
            console.log({ error })
            throw error
        }
    }

}