import { Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { ProductCreateType, Products } from './entities/product.entity'
import { CategoryRepository } from './categories.repository'
import { Categories } from './entities/product-category.entity'
import { Brands } from './entities/product-brand.entity'
import { BrandRepository } from './brands.repository'

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly brandRepository: BrandRepository
    ) {}

    async getProducts(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Products>> {
        return this.productRepository.getProducts(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    async getProduct(id: number): Promise<Products> {
        console.log(id)
        return this.productRepository.findOneBy({ id })
    }

    async createProduct(product: ProductCreateType): Promise<Products> {
        console.log({ product })
        return this.productRepository.createProduct(product)
    }
    async updateProduct(product: ProductCreateType, id: number) {
        return await this.productRepository.updateProduct(id, product)
    }
    async deleteProduct(id: number) {
        return await this.productRepository.deleteProduct(id)
    }

    async getCategories(): Promise<Categories[]> {
        return await this.categoryRepository.find()
    }
    async createCategory(category: string): Promise<Categories> {
        return this.categoryRepository.save({ name: category })
    }

    async updateCategory(name: string, category: string) {
        return await this.categoryRepository.updateCategory(name, category)
    }
    async getBrands(): Promise<Brands[]> {
        return this.brandRepository.find()
    }
    async deleteCategory(name: string) {
        return await this.categoryRepository.deleteCategory(name)
    }

    async updateBrand(name: string, brand: string) {
        return await this.brandRepository.updateBrand(name, brand)
    }
    async createBrand(brand: string): Promise<Brands> {
        return this.brandRepository.save({ name: brand })
    }
    async deleteBrand(name: string) {
        return await this.brandRepository.deleteBrand(name)
    }
}
