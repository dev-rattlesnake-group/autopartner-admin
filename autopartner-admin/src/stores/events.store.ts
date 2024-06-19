import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
import eventsService from '@/services/events.service'

export interface IEventDetails {
  id?: number
  event_id?: number
  title: string
  description: string
}
export interface IEvent {
  id?: number
  title: string
  description: string
  expired_date: Date
  image_url: string
  event_details?: IEventDetails[]
  created_at?: string
  updated_at?: string
}

export const useEventStore = defineStore({
  id: 'events',
  state: () => ({
    events: [] as IEvent[] | [],
    event: {} as IEvent,
    total: 0,
  }),
  actions: {
    async get(params: Iparams): Promise<void> {
      const data = await eventsService.get(params)
      this.events = data.data
      this.total = data.meta.itemCount
    },

    async create(product: { event: IEvent; event_details: IEventDetails[] }) {
      const data = await eventsService.create(product)
    },
    async update(product: { event: IEvent; event_details: IEventDetails[] }) {
      const data = await eventsService.update(product)
    },
    async delete(product: IEvent) {
      const data = await eventsService.delete(product)
    },
    async getOne(id: number) {
      const data = await eventsService.getOne(id)
      this.event = data
    },
  },
})
