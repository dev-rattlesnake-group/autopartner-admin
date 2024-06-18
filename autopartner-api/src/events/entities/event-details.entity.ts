import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Events } from './events.entity'

export type EventDetailsCreateType = {
    id?: number
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

    @ManyToOne((type) => Events)
    @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
    event_id: number
}
