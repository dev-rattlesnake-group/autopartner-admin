import type { IProduct, IProductCategory } from "@/stores/product.store"
import { authHeader } from "./auth-header.service"
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

export default new class ProductService {

    async getProducts(params: object): Promise<{ items: IProduct[] | [], total: number }> {
        try {
            const { data } = await axios.get(API_URL + '/product', { headers: authHeader(), params })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async getProduct(id: number) {
        try {
            const { data } = await axios.get(API_URL + '/product/' + id, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async createProduct(productDto: IProduct) {
        try {
            const { data } = await axios.post(API_URL + '/product', productDto, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async updateProduct(productDto: IProduct) {
        try {
            const { data } = await axios.put(API_URL + '/product/' + productDto.id, productDto, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async getProductCategories(): Promise<IProductCategory[]> {
        try {
            const { data } = await axios.get(API_URL + '/product/category', { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async uploadImage(file: any) {
        try {
            const formData = new FormData();
            formData.append("file", file.originFileObj);
            const { data } = await axios.post(API_URL + '/upload/image', formData, { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async getShoppingCart() {
        try {
            const { data } = await axios.get(API_URL + '/cart', { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async addToShoppingCart(cartItemDto: any) {
        try {
            const { data } = await axios.post(API_URL + '/cart', cartItemDto, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }


    async getFavorites() {
        try {
            const { data } = await axios.get(API_URL + '/favorite', { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async addToFavorites(product_id: number) {
        try {
            const { data } = await axios.post(API_URL + '/favorite', { product_id }, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

    async removeFromFavorites(favorite_id: number) {
        try {
            const { data } = await axios.delete(API_URL + `/favorite/${favorite_id}`, { headers: authHeader() })
            return data
        } catch (error) {
            console.log({ error })
            throw error
        }
    }

}