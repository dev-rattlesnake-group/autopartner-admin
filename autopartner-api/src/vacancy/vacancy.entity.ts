import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm'

export type VacancyCreateType = {
    title: string
    description_1?: string
    description_2?: string
    description_3?: string
    description_4?: string
    description_5?: string
    description_6?: string
}

@Entity()
export class Vacancies extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar', nullable: true })
    description_1: string

    @Column({ type: 'varchar', nullable: true })
    description_2: string

    @Column({ type: 'varchar', nullable: true })
    description_3: string

    @Column({ type: 'varchar', nullable: true })
    description_4: string

    @Column({ type: 'varchar', nullable: true })
    description_5: string

    @Column({ type: 'varchar', nullable: true })
    description_6: string

    @Column({ type: 'varchar', nullable: true })
    description_7: string

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}
