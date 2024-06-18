import { Module } from '@nestjs/common'
import { EventService } from './events.service'
import { EventsController } from './events.controller'
import { EventRepository } from './repositories/events.repository'
import { EventDetailsRepository } from './repositories/event-details.repository'

@Module({
    providers: [EventService, EventRepository, EventDetailsRepository],
    controllers: [EventsController],
})
export class EventsModule {}
