import { Injectable } from '@nestjs/common'

import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { VacancyRepository } from './vacancy.repository'
import { Vacancies, VacancyCreateType } from './vacancy.entity'

@Injectable()
export class VacancyService {
    constructor(private readonly vacancyRepository: VacancyRepository) {}
    async get(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Vacancies>> {
        return this.vacancyRepository.getVacancies(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }
    async create(dto: VacancyCreateType) {
        return this.vacancyRepository.save(dto)
    }
    async update(id: number, dto: VacancyCreateType) {
        return await this.vacancyRepository.updateVacancy(id, dto)
    }
    async delete(id: number) {
        return await this.vacancyRepository.delete(id)
    }
    async getById(id: number) {
        return await this.vacancyRepository.findOne({ where: { id } })
    }
}
