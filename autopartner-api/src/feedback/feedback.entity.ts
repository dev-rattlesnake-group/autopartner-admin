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

    @Column({ type: 'varchar', nullable: true })
    company: string

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}
