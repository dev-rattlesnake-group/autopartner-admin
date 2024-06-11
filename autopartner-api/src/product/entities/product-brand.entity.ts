import { BaseEntity, Column, Entity } from 'typeorm'

export type BrandCreateType = {
    name: string
}

@Entity()
export class Brands extends BaseEntity {
    @Column({ length: 50, unique: true, primary: true, type: 'varchar' })
    name: string
}
