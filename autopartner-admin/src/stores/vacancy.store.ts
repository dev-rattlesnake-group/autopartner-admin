import { defineStore } from 'pinia'
import type { Iparams } from '@/interfaces/params.interface'
import vacancyService from '@/services/vacancy.service'

export interface IVacancy {
  id?: number
  title: string
  description_1?: string
  description_2?: string
  description_3?: string
  description_4?: string
  description_5?: string
  description_6?: string
  description_7?: string
  created_at?: string
  updated_at?: string
}

export const useVacancyStore = defineStore({
  id: 'vacancy',
  state: () => ({
    vacancies: [] as IVacancy[] | [],
    vacancy: {} as IVacancy,
    total: 0,
  }),
  actions: {
    async get(params: Iparams): Promise<void> {
      const data = await vacancyService.get(params)
      this.vacancies = data.data
      this.total = data.meta.itemCount
    },

    async create(product: IVacancy) {
      const data = await vacancyService.create(product)
    },
    async update(product: IVacancy) {
      const data = await vacancyService.update(product)
    },
    async delete(product: IVacancy) {
      const data = await vacancyService.delete(product)
    },
    async getOne(id: number) {
      const data = await vacancyService.getOne(id)
      this.vacancy = data
    },
  },
})
