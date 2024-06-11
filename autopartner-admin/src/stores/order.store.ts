import type { Iparams } from '@/interfaces/params.interface'
import { defineStore } from 'pinia'
import OrderService from '@/services/order.service'
export interface IOrderItems {
    id: number
    amount: number
    quantity: number
    product_id: number
    product_name: string
}

export interface IOrdersTransaction {
    summary_amount: number
    period_label: string
}
export interface ITopProduct {
    amount: number
    name: string
}
export interface IOrder {
    id: number
    status_id: number
    account_id: number
    total_amount: number
    delivery_date: string
    discount: number
    created_at: string
    updated_at: string
    invoice?: string
    invoice_id?: number
    invoice_number?: string
    customer?: { name: string, phone: string, email: string, billing_address: string, delivery_address: string, status: string, company_name: string }
    number: string
    status: "pending" | "accepted" | "completed"
    items: IOrderItems[],
    items_total?: number
}

export const useOrderStore = defineStore({
    id: 'orders',
    state: () => ({
        orders: [] as IOrder[] | [],
        order: null as IOrder,
        orderStatuses: [{ id: 1, name: 'pending' }, { id: 2, name: 'accepted' }, { id: 3, name: 'completed' }],
        total: 0,
        comletedOrders: 0,
        pendingOrders: 0,
        recentOrders: 0,
        orderAmountTotal: 0,
        orderItemsTotal: 0,
        ordersTransactions: [] as IOrdersTransaction[],
        topProducts: [] as ITopProduct[]

    }),
    actions: {
        async getOrders(params: Iparams) {
            const data: { items: IOrder[] | []; total: number } = await OrderService.getOrders(params)
            this.orders = data.items
            this.total = data.total
            this.comletedOrders = this.orders.filter(order => order.status === 'completed').length
            this.pendingOrders = this.orders.filter(order => order.status === 'pending').length
            this.orderAmountTotal = this.orders.reduce((acc, order) => { return acc + order.total_amount }, 0)
            this.orderItemsTotal = this.orders.reduce((acc, order) => { return acc + Number(order.items_total) }, 0)
            this.setOrdersTransactions()
            this.setTopProductsCategory()
        },

        async getOrder(id: number) {
            const data = await OrderService.getOrder(id)
            this.order = data
            // this.total = data.total
            // this.comletedOrders = this.orders.filter(order => order.status === 'completed').length
            // this.pendingOrders = this.orders.filter(order => order.status === 'pending').length
            // this.orderAmountTotal = this.orders.reduce((acc, order) => { return acc + order.total_amount }, 0)
            // this.orderItemsTotal = this.orders.reduce((acc, order) => { return acc + Number(order.items_total) }, 0)
        },

        async createOrder(cart_id: number) {
            const data = await OrderService.createOrder(cart_id)
            return data

        },

        setOrdersTransactions(period = 7) {
            this.ordersTransactions = []
            for (let i = period; i--; i <= 0) {
                const startDate = new Date()
                startDate.setDate(startDate.getDate() - i)
                startDate.setHours(0)
                startDate.setMinutes(0)
                const endDate = new Date()
                endDate.setDate(endDate.getDate() - i)
                endDate.setHours(23)
                endDate.setMinutes(59)

                const ordersTransaction = {
                    period_label: `${new Date(startDate).toLocaleDateString()}`,
                    summary_amount: this.orders
                        .filter(o => new Date(o.created_at) > startDate && new Date(o.created_at) < endDate)
                        ?.reduce((acc, curr) => acc + curr.total_amount, 0)
                }
                this.ordersTransactions.push(ordersTransaction)
            }

        },

        setTopProductsCategory() {
            this.topProducts = []
            const productsWithQuantity = {}
            this.orders.forEach(order => {
                order.items.forEach(product => {
                    productsWithQuantity[product.product_name] = (productsWithQuantity[product.product_name] || 0) + product.amount
                })

            })

            this.topProducts = Object.entries(productsWithQuantity).map(value => {
                return { name: value[0], amount: value[1] }
            }).sort((a, b) => b.amount - a.amount)


        },

        async updateOrderStatus(status_id:number) {
            const dto = {id:this.order.id, status_id}
            const data = await OrderService.updateOrderStatus(dto)
            // return data

        },

    }
})