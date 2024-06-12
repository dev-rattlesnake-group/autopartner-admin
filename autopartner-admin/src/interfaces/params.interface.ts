export interface Iparams {
  filter?: Record<string, string>
  page: number
  take: number
  sort?: { field: string; order: string }
  search?: string
}
