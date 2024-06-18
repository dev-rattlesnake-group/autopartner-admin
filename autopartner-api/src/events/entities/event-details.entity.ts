import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm'

export type EventDetailsCreateType = {
    title: string
    description: string
    event_id: number
}

@Entity()
export class EventDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar' })
    description: string

    @Column({ type: 'int' })
    event_id: number
}
