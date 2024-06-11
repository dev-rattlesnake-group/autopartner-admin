import { BaseEntity, Column, Entity } from 'typeorm'

export type CategoryCreateType = {
    name: string
}

@Entity()
export class Categories extends BaseEntity {
    @Column({ length: 50, unique: true, primary: true, type: 'varchar' })
    name: string
}
