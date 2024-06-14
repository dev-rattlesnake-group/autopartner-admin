import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm'

export type NewsCreateType = {
    title: string
    context: string
    image_url?: string
    date: Date
}

@Entity()
export class News extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar' })
    content: string

    @Column({ type: 'varchar', nullable: true })
    image_url: string

    @Column({ type: 'date' })
    date: Date

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}
