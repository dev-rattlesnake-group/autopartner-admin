import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Brands } from './entities/product-brand.entity'

@Injectable()
export class BrandRepository extends Repository<Brands> {
    constructor(private dataSource: DataSource) {
        super(Brands, dataSource.createEntityManager())
    }
}
