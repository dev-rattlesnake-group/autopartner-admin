import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageMetaDto } from 'src/dto/page-meta.dto'
import { Feedbacks, FeedbackCreateType } from './feedback.entity'

@Injectable()
export class FeedbackRepository extends Repository<Feedbacks> {
    constructor(private dataSource: DataSource) {
        super(Feedbacks, dataSource.createEntityManager())
    }
    async updateFeedback(id: number, newsDto: FeedbackCreateType) {
        return this.createQueryBuilder('feedbacks')
            .update()
            .set(newsDto)
            .where('id = :id', { id: id })
            .execute()
    }
    async deleteFeedback(id: number) {
        return this.createQueryBuilder('feedbacks')
            .delete()
            .where('id = :id', { id: id })
            .execute()
    }
    async getFeedbacks(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Feedbacks>> {
        const queryBuilder = this.createQueryBuilder('feedbacks')
        queryBuilder
            .orderBy('feedbacks.created_at', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        if (filterParams) {
            Object.keys(filterParams).forEach((f) => {
                queryBuilder.andWhere(`feedbacks.${f} IN (:...${f})`, {
                    [f]: filterParams[f],
                })
            })
        }

        if (searchParams) {
            queryBuilder.andWhere('feedbacks.author LIKE :search', {
                search: `%${searchParams}%`,
            })
        }
        if (sortParams) {
            const sortParamDirectoin = sortParams.direction.toUpperCase() as
                | 'ASC'
                | 'DESC'
            queryBuilder.orderBy(
                `feedbacks.${sortParams.property}`,
                sortParamDirectoin
            )
        }

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }
}
