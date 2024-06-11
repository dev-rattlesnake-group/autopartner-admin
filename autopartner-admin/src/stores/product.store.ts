import ProductService from '@/services/product.service'
import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
export interface IProduct {
    id?: number
    name: string
    country: string
    price: number
    rrp: number
    stock: number
    discount?: number
    shelf_life: number
    unit_size: number
    quantity_pack: string
    unit_measure: string
    category_id: number
    category?: string
    image_url: string
    alc_vol: string
    ean: string
    code: string
    status: 'draft' | 'published'
    created_at?: string
    updated_at?: string
}

export interface IProductCategory {
    id: number
    name: string
}

export const useProductStore = defineStore({
    id: 'products',
    state: () => ({
        products: [] as IProduct[] | [],
        product: {} as IProduct,
        total: 0,
        categories: [] as IProductCategory[] | [],
        inStock: 0 as number,
        outOfStock: 0 as number,
    }),
    actions: {
        async getProducts(params: Iparams): Promise<void> {
            const data: { items: IProduct[] | []; total: number } = await ProductService.getProducts(params)
            this.products = data.items
            this.total = data.total
            this.inStock = this.products.filter(i => i.stock > 0).length
            this.outOfStock = this.products.filter(i => i.stock < 1).length
        },
        async getProduct(id: number): Promise<void> {
            const data:IProduct = await ProductService.getProduct(id)
            this.product = data
           
        },
        async getProductCategories() {
            const data = await ProductService.getProductCategories()
            this.categories = data
        },
        async createProduct(product: IProduct) {
            const data = await ProductService.createProduct(product)
        },
        async updateProduct(product: IProduct) {
            const data = await ProductService.updateProduct(product)
        },
        async uploadImage(file: File) {
            const data = await ProductService.uploadImage(file)
        }
    }

})