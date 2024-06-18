import { Injectable } from '@nestjs/common'

import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { EventRepository } from './repositories/events.repository'
import { EventDetailsRepository } from './repositories/event-details.repository'
import { EventCreateType, Events } from './entities/events.entity'
import { EventDetailsCreateType } from './entities/event-details.entity'
import { EntityManager } from 'typeorm'

@Injectable()
export class EventService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly eventDetailsRepository: EventDetailsRepository,
        private readonly entityManager: EntityManager
    ) {}

    async get(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Events>> {
        const result = await this.eventRepository.getEvents(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
        console.log(result.data)
        return result
    }
    async create(dto: {
        event: EventCreateType
        event_details: EventDetailsCreateType[]
    }) {
        // await this.entityManager
        //     .transaction(async (em) => {
        try {
            const event = await this.eventRepository.save(dto.event)
            const eventDetails = dto.event_details.map((el) => {
                return { ...el, event_id: event.id }
            })
            const result = await this.eventDetailsRepository.save(eventDetails)

            // })
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    async update(
        id: number,
        dto: {
            event: EventCreateType
            event_details: EventDetailsCreateType[]
        }
    ) {
        try {
            await this.eventRepository.updateEvent(id, dto.event)
            for await (const el of dto.event_details) {
                await this.eventDetailsRepository.updateEventDetails(el.id, el)
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    async delete(id: number) {
        return await this.eventRepository.deleteEvent(id)
    }
    async getById(id: number) {
        return await this.eventRepository.getEvent(id)
    }
}
