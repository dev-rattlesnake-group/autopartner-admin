import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Brands } from './entities/product-brand.entity'

@Injectable()
export class BrandRepository extends Repository<Brands> {
    constructor(private dataSource: DataSource) {
        super(Brands, dataSource.createEntityManager())
    }
    async updateBrand(name: string, brand: string) {
        return this.createQueryBuilder('brands')
            .update()
            .set({ name: brand })
            .where('name = :name', { name: name })
            .execute()
    }
    async deleteBrand(brand: string) {
        return this.createQueryBuilder('brands')
            .delete()
            .where('name = :name', { name: brand })
            .execute()
    }
}
