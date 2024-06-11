import invoiceService from '@/services/invoice.service'
import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
export interface IInvoice {
    id?: number
    number: string
    total_amount: number
    order_id: number
    account_id: number
    status_id: number
    status?: 'unpaid' | 'paid'
    company?: string
    created_at?: string
    updated_at?: string
}

export interface IInvoiceStatus {
    id: number
    name: string
}

export const useInvoiceStore = defineStore({
    id: 'invoices',
    state: () => ({
        invoices: [] as IInvoice[] | [],
        invoice: {} as IInvoice,
        total: 0,

    }),
    actions: {
        async getInvoices(params: Iparams): Promise<void> {
            const data: { items: IInvoice[] | []; total: number } = await invoiceService.getInvoices(params)
            this.invoices = data.items
            this.total = data.total
        },
        async getInvoice(id: number): Promise<void> { 
            const data = await invoiceService.getInvoice(id)
            this.invoice = data
        },


    }

})