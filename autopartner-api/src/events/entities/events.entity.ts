import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { EventDetails } from './event-details.entity'

export type EventCreateType = {
    title: string
    description: string
    image_url: string
    expired_date: Date
}

@Entity()
export class Events extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar' })
    description: string

    @Column({ type: 'varchar', nullable: true })
    image_url: string

    @Column({ type: 'date' })
    expired_date: Date

    @OneToMany(() => EventDetails, (eventDetail) => eventDetail.event_id)
    event_details: EventDetails[]

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}
