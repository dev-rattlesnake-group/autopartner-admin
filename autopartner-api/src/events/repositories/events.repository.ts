import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageMetaDto } from 'src/dto/page-meta.dto'
import { EventCreateType, Events } from '../entities/events.entity'

@Injectable()
export class EventRepository extends Repository<Events> {
    constructor(private dataSource: DataSource) {
        super(Events, dataSource.createEntityManager())
    }
    async getEvent(id: number) {
        return this.createQueryBuilder('events')
            .where('id = :id', { id: id })
            .leftJoinAndSelect('event_details', 'event_id')
            .getOne()
    }
    async updateEvent(id: number, dto: EventCreateType) {
        return this.createQueryBuilder('events')
            .update()
            .set(dto)
            .where('id = :id', { id: id })
            .execute()
    }
    async deleteEvent(id: number) {
        return this.createQueryBuilder('events')
            .delete()
            .where('id = :id', { id: id })
            .execute()
    }
    async getEvents(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Events>> {
        const queryBuilder = this.createQueryBuilder('events')
        queryBuilder
            .orderBy('events.created_at', pageOptionsDto.order)
            .leftJoinAndSelect('event_details', 'event_id')
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        if (filterParams) {
            Object.keys(filterParams).forEach((f) => {
                queryBuilder.andWhere(`events.${f} IN (:...${f})`, {
                    [f]: filterParams[f],
                })
            })
        }

        if (searchParams) {
            queryBuilder.andWhere('events.title LIKE :search', {
                search: `%${searchParams}%`,
            })
        }
        if (sortParams) {
            const sortParamDirectoin = sortParams.direction.toUpperCase() as
                | 'ASC'
                | 'DESC'
            queryBuilder.orderBy(
                `events.${sortParams.property}`,
                sortParamDirectoin
            )
        }

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }
}
