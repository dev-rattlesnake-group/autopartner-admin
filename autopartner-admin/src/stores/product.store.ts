import ProductService from '@/services/product.service'
import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
export interface IProduct {
  id?: number
  account_id?: number
  category: string
  brand: string
  name: string
  in_stock: boolean
  price: number
  engine?: string
  vehicles_year?: string
  transmission?: string
  max_weight?: string
  cabin_type?: string
  suspension_type?: string
  suspension_cabin?: string
  suspension_chassis?: string
  brake_type?: string
  wheel_formula?: string
  axles_number?: string
  fifth_wheel_height?: string
  trailer_length?: string
  euro?: string
  color?: string
  options?: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

export interface IProductCategory {
  name: string
}

export const useProductStore = defineStore({
  id: 'products',
  state: () => ({
    products: [] as IProduct[] | [],
    product: {} as IProduct,
    total: 0,
    categories: [] as string[] | [],
    brands: [] as string[] | [],
  }),
  actions: {
    async getProducts(params: Iparams): Promise<void> {
      const data = await ProductService.getProducts(params)
      console.log({ data })
      this.products = data.data
      this.total = data.meta.itemCount
      //   this.inStock = this.products.filter((i) => i.stock > 0).length
      //   this.outOfStock = this.products.filter((i) => i.stock < 1).length
    },
    async getProduct(id: number): Promise<void> {
      const data: IProduct = await ProductService.getProduct(id)
      this.product = data
    },
    async getProductCategories() {
      const data: IProductCategory[] =
        await ProductService.getProductCategories()
      this.categories = data.map((i) => i.name)
    },
    async getProductBrands() {
      const data: IProductCategory[] = await ProductService.getProductBrands()
      this.brands = data.map((i) => i.name)
    },
    async createProduct(product: IProduct) {
      const data = await ProductService.createProduct(product)
    },
    async updateProduct(product: IProduct) {
      const data = await ProductService.updateProduct(product)
    },
    async deleteProduct(product: IProduct) {
      const data = await ProductService.deleteProduct(product)
    },
    async createCategory(category: string) {
      const data = await ProductService.createProductCategories(category)
    },
    async updateCategory(category: string, newCategory: string) {
      const data = await ProductService.updateProductCategories(
        category,
        newCategory
      )
    },
    async deleteCategory(category: string) {
      const data = await ProductService.deleteProductCategories(category)
    },
    async uploadImage(file: File) {
      const data = await ProductService.uploadImage(file)
    },
  },
})
