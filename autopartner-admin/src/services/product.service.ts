import type { IProduct, IProductCategory } from '@/stores/product.store'
import { authHeader } from './auth-header.service'
const API_URL = import.meta.env.VITE_API_URL
import axios from 'axios'

export default new (class ProductService {
  async getProducts(
    params: object
  ): Promise<{ data: IProduct[] | []; meta: any }> {
    try {
      const { data } = await axios.get(API_URL + '/products', {
        headers: authHeader(),
        params,
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async getProduct(id: number) {
    try {
      const { data } = await axios.get(API_URL + '/products/' + id, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async createProduct(productDto: IProduct) {
    try {
      const { data } = await axios.post(API_URL + '/products', productDto, {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async updateProduct(productDto: IProduct) {
    try {
      const { data } = await axios.put(
        API_URL + '/products/' + productDto.id,
        productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async deleteProduct(productDto: IProduct) {
    try {
      const { data } = await axios.delete(
        API_URL + '/products/' + productDto.id,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async getProductCategories(): Promise<IProductCategory[]> {
    try {
      const { data } = await axios.get(API_URL + '/products/categories', {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async createProductCategories(productDto: string) {
    try {
      const { data } = await axios.post(
        API_URL + '/products/categories',
        { name: productDto },
        {
          headers: authHeader(),
        }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async updateProductCategories(category: string, newCategory: string) {
    console.log({ category, newCategory })
    try {
      const { data } = await axios.put(
        API_URL + '/products/categories/' + category,
        { name: newCategory },
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async deleteProductCategories(productDto: string) {
    try {
      const { data } = await axios.delete(
        API_URL + '/products/categories/' + productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async getProductBrands(): Promise<IProductCategory[]> {
    try {
      const { data } = await axios.get(API_URL + '/products/brands', {
        headers: authHeader(),
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async createProductBrand(productDto: string) {
    try {
      const { data } = await axios.post(
        API_URL + '/products/brands',
        { name: productDto },
        {
          headers: authHeader(),
        }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
  async updateProductBrand(category: string, newCategory: string) {
    console.log({ category, newCategory })
    try {
      const { data } = await axios.put(
        API_URL + '/products/brands/' + category,
        { name: newCategory },
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async deleteProductBrand(productDto: string) {
    try {
      const { data } = await axios.delete(
        API_URL + '/products/brands/' + productDto,
        { headers: authHeader() }
      )
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  async uploadImage(file: any) {
    try {
      const formData = new FormData()
      formData.append('file', file.originFileObj)
      const { data } = await axios.post(API_URL + '/upload/image', formData, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      })
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
})()
