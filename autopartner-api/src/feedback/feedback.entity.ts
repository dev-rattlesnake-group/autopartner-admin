import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm'

export type FeedbackCreateType = {
    author: string
    content: string
    date: Date
    company?: string
}

@Entity()
export class Feedbacks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    author: string

    @Column({ type: 'varchar' })
    content: string

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'varchar', nullable: true })
    company: string

    @Column({ type: 'varchar', nullable: true })
    image_url: string

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}
