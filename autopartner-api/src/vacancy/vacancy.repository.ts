import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageMetaDto } from 'src/dto/page-meta.dto'
import { Vacancies, VacancyCreateType } from './vacancy.entity'

@Injectable()
export class VacancyRepository extends Repository<Vacancies> {
    constructor(private dataSource: DataSource) {
        super(Vacancies, dataSource.createEntityManager())
    }
    async getVacancy(id: number) {
        return this.createQueryBuilder('vacancies')
            .where('id = :id', { id: id })
            .getOne()
    }
    async updateVacancy(id: number, dto: VacancyCreateType) {
        return this.createQueryBuilder('vacancies')
            .update()
            .set(dto)
            .where('id = :id', { id: id })
            .execute()
    }
    async deleteVacancy(id: number) {
        return this.createQueryBuilder('vacancies')
            .delete()
            .where('id = :id', { id: id })
            .execute()
    }
    async getVacancies(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Vacancies>> {
        const queryBuilder = this.createQueryBuilder('vacancies')
        queryBuilder
            .orderBy('vacancies.created_at', pageOptionsDto.order)
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
            queryBuilder.andWhere('vacancies.title LIKE :search', {
                search: `%${searchParams}%`,
            })
        }
        if (sortParams) {
            const sortParamDirectoin = sortParams.direction.toUpperCase() as
                | 'ASC'
                | 'DESC'
            queryBuilder.orderBy(
                `vacancies.${sortParams.property}`,
                sortParamDirectoin
            )
        }

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }
}
