import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { News, NewsCreateType } from './news.entity'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageMetaDto } from 'src/dto/page-meta.dto'

@Injectable()
export class NewsRepository extends Repository<News> {
    constructor(private dataSource: DataSource) {
        super(News, dataSource.createEntityManager())
    }
    async updateNews(id: number, newsDto: NewsCreateType) {
        return this.createQueryBuilder('news')
            .update()
            .set(newsDto)
            .where('id = :id', { id: id })
            .execute()
    }
    async deleteCategory(id: number) {
        return this.createQueryBuilder('news')
            .delete()
            .where('id = :id', { id: id })
            .execute()
    }
    async getNews(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<News>> {
        const queryBuilder = this.createQueryBuilder('news')
        queryBuilder
            .orderBy('news.created_at', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        if (filterParams) {
            Object.keys(filterParams).forEach((f) => {
                queryBuilder.andWhere(`news.${f} IN (:...${f})`, {
                    [f]: filterParams[f],
                })
            })
        }

        if (searchParams) {
            queryBuilder.andWhere('news.title LIKE :search', {
                search: `%${searchParams}%`,
            })
        }
        if (sortParams) {
            const sortParamDirectoin = sortParams.direction.toUpperCase() as
                | 'ASC'
                | 'DESC'
            queryBuilder.orderBy(
                `news.${sortParams.property}`,
                sortParamDirectoin
            )
        }

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }
}
