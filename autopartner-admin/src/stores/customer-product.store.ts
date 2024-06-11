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
    total: number
}

export interface IFavorite {
    id: number
    account_id: number
    created_at?: string
    updated_at?: string
    items: [] | IFavoriteItem[]
}

export interface IFavoriteItem {
    favorite_id: number
    id: number
    product_id: number
    created_at?: string
    updated_at?: string
}
export interface IShoppingCartItemDto {
    id?: number
    product_id: number 
    quantity: number 
    product_price: number  
    amount: number
}

export const useCustomerProductStore = defineStore({
    id: 'customer-products',
    state: () => ({
        products: [] as IProduct[] | [],
        total: 0,
        categories: [] as IProductCategory[] | [],
        inStock: 0 as number,
        outOfStock: 0 as number,
        shopping_cart: {},
        favorites: [] as IFavorite[] | [],
        favoriteItemProductIds: [] as string[]
    }),

    actions: {
        async getProducts(params: Iparams): Promise<void> {
            const data: { items: IProduct[] | []; total: number } = await ProductService.getProducts(params)
            this.products = data.items
            this.total = data.total
            this.inStock = this.products.filter(i => i.stock > 0).length
            this.outOfStock = this.products.filter(i => i.stock < 1).length
            if (this.categories.length) {
                this.categories.forEach(category => {
                    category.total = this.products.filter(product => product?.category == category.name)?.length

                })
            }
        },

        async getProductCategories(): Promise<void> {
            const data = await ProductService.getProductCategories()
            this.categories = data
            if (this.products.length) {
                this.categories.forEach(category => {
                    category.total = this.products.filter(product => product?.category == category.name)?.length
                })
            }
        },

        async getShoppingCart(): Promise<void> {
            const [data] = await ProductService.getShoppingCart()
            this.shopping_cart = data

        },

        async addToShoppingCart(itemCartDto: IShoppingCartItemDto): Promise<void> {
            const [data] = await ProductService.addToShoppingCart(itemCartDto)
            this.shopping_cart = data
        },


        async getFavorites(): Promise<void> {
            const [data] = await ProductService.getFavorites()
            this.favorites = data
            this.favoriteItemProductIds = this.favorites?.items.map((item: IFavoriteItem) => item && item.product_id)
        },

        async addToFavorites(productId: number): Promise<void> {
            const [data] = await ProductService.addToFavorites(productId)
            this.favorites = data
            this.favoriteItemProductIds = this.favorites?.items.map((item: IFavoriteItem) => item && item.product_id)
        },

        async removeFromFavorites(favoriteItemId: number): Promise<void> {
            const [data] = await ProductService.removeFromFavorites(favoriteItemId)
            this.favorites = data
            this.favoriteItemProductIds = this.favorites?.items.map((item: IFavoriteItem) => item && item.product_id)
        }




    }

})