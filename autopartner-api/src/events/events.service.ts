import { Injectable } from '@nestjs/common'

import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { EventRepository } from './repositories/events.repository'
import { EventDetailsRepository } from './repositories/event-details.repository'
import { EventCreateType, Events } from './entities/events.entity'
import { EventDetailsCreateType } from './entities/event-details.entity'

@Injectable()
export class EventService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly eventDetailsRepository: EventDetailsRepository
    ) {}
    async get(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Events>> {
        return this.eventRepository.getEvents(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }
    async create(dto: {
        event: EventCreateType
        event_details: EventDetailsCreateType[]
    }) {
        // return this.vacancyRepository.save(dto)
        // }
        // async update(id: number, dto: VacancyCreateType) {
        //     return await this.vacancyRepository.updateVacancy(id, dto)
        // }
        // async delete(id: number) {
        //     return await this.vacancyRepository.delete(id)
        // }
        // async getById(id: number) {
        //     return await this.vacancyRepository.findOne({ where: { id } })
        // }
    }
}
