import { Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { ProductCreateType, Products } from './entities/product.entity'

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

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

    async createProduct(product: ProductCreateType): Promise<Products> {
        return this.productRepository.createProduct(product)
    }
    async updateProduct(product: ProductCreateType, id: number) {
        return await this.productRepository.updateProduct(id, product)
    }
    async deleteProduct(id: number) {
        return await this.productRepository.deleteProduct(id)
    }
}
