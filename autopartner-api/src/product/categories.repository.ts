import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Categories } from './entities/product-category.entity'

@Injectable()
export class CategoryRepository extends Repository<Categories> {
    constructor(private dataSource: DataSource) {
        super(Categories, dataSource.createEntityManager())
    }
    async updateCategory(name: string, category: string) {
        return this.createQueryBuilder('categories')
            .update()
            .set({ name: category })
            .where('name = :name', { name: name })
            .execute()
    }
    async deleteCategory(category: string) {
        return this.createQueryBuilder('categories')
            .delete()
            .where('name = :name', { name: category })
            .execute()
    }
}
