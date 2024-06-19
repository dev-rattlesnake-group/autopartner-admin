import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import {
    EventDetails,
    EventDetailsCreateType,
} from '../entities/event-details.entity'

@Injectable()
export class EventDetailsRepository extends Repository<EventDetails> {
    constructor(private dataSource: DataSource) {
        super(EventDetails, dataSource.createEntityManager())
    }
    async getEventDetail(id: number) {
        return this.createQueryBuilder('event_details')
            .where('id = :id', { id: id })
            .getOne()
    }
    async updateEventDetails(id: number, dto: EventDetailsCreateType) {
        return this.createQueryBuilder('event_details')
            .update()
            .set(dto)
            .where('id = :id', { id: id })
            .execute()
    }
    async deleteEventDetail(id: number) {
        return this.createQueryBuilder('event_details')
            .delete()
            .where('id = :id', { id: id })
            .execute()
    }
}
