import type { IInvoice, IInvoiceStatus } from "@/stores/invoice.store"
import type { Iparams } from '@/interfaces/params.interface'
import { authHeader } from "./auth-header.service"
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

export default new class InvoiceService {
    async getInvoices(params: Iparams): Promise<{ items: IInvoice[] | [], total: number }> {
        try {
            const { data } = await axios.get(API_URL + '/invoice', { headers: authHeader(), params })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
    async getInvoice(id:number): Promise<IInvoice> {
        try {
            const { data } = await axios.get(API_URL + `/invoice/${id}`, { headers: authHeader()})
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

}