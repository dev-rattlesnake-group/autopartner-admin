import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { ProductCreateType, Products } from './entities/product.entity'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageMetaDto } from 'src/dto/page-meta.dto'

@Injectable()
export class ProductRepository extends Repository<Products> {
    constructor(private dataSource: DataSource) {
        super(Products, dataSource.createEntityManager())
    }

    async getProducts(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Products>> {
        const queryBuilder = this.createQueryBuilder('products')
        queryBuilder
            .orderBy('products.created_at', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        if (filterParams) {
            Object.keys(filterParams).forEach((f) => {
                queryBuilder.andWhere(`products.${f} IN (:...${f})`, {
                    [f]: filterParams[f],
                })
            })
        }

        if (searchParams) {
            queryBuilder.andWhere('products.name LIKE :search', {
                search: `%${searchParams}%`,
            })
        }
        if (sortParams) {
            const sortParamDirectoin = sortParams.direction.toUpperCase() as
                | 'ASC'
                | 'DESC'
            queryBuilder.orderBy(
                `products.${sortParams.property}`,
                sortParamDirectoin
            )
        }

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }

    async createProduct(product: ProductCreateType): Promise<Products> {
        if (product.image_urls?.length) {
            let image_urls = `{`
            product.image_urls.forEach((i, index) => {
                image_urls += `'${i}'`
                if (index < product.image_urls.length - 1) {
                    image_urls += `,`
                }
            })
            image_urls += `}`

            // @ts-ignore
            product.image_urls = image_urls
        } else {
            product.image_urls = null
        }
        return this.save(product)
    }

    async updateProduct(id: number, product: ProductCreateType) {
        if (product.image_urls?.length) {
            let image_urls = `{`
            product.image_urls.forEach((i, index) => {
                image_urls += `${i}`
                if (index < product.image_urls.length - 1) {
                    image_urls += `,`
                }
            })
            image_urls += `}`

            // @ts-ignore
            product.image_urls = image_urls
        } else {
            product.image_urls = null
        }
        return this.createQueryBuilder('products')
            .update()
            .set(product)
            .where('id = :id', { id })
            .execute()
    }
    async deleteProduct(id: number) {
        return this.createQueryBuilder('products')
            .delete()
            .where('id = :id', { id })
            .execute()
    }
}
