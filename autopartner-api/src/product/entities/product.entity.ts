import {
    BaseEntity,
    Entity,
    JoinColumn,
    OneToOne,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm'

export type ProductCreateType = {
    account_id: number
    category: string
    brand: string
    name: string
    in_stock: boolean
    price: number
    engine?: string
    vehicles_year?: string
    transmission?: string
    max_weight?: string
    cabin_type?: string
    suspension_type?: string
    suspension_cabin?: string
    suspension_chassis?: string
    brake_type?: string
    wheel_formula?: string
    axles_number?: string
    fifth_wheel_height?: string
    trailer_length?: string
    trailer_volume?: string
    euro?: string
    color?: string
    options?: string
    image_url?: string
    image_urls?: string[]
}

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    account_id: number

    @Column({ type: 'varchar' })
    category: string

    @Column({ type: 'varchar' })
    brand: string

    @Column({ type: 'varchar', nullable: true })
    name: string

    @Column({ type: 'bool' })
    in_stock: boolean

    @Column({ type: 'int' })
    price: number

    @Column({ type: 'varchar', nullable: true })
    engine?: string

    @Column({ type: 'varchar', nullable: true })
    vehicles_year?: string

    @Column({ type: 'varchar', nullable: true })
    transmission?: string

    @Column({ type: 'varchar', nullable: true })
    max_weight?: string

    @Column({ type: 'varchar', nullable: true })
    cabin_type?: string

    @Column({ type: 'varchar', nullable: true })
    suspension_type?: string

    @Column({ type: 'varchar', nullable: true })
    suspension_cabin?: string

    @Column({ type: 'varchar', nullable: true })
    suspension_chassis?: string

    @Column({ type: 'varchar', nullable: true })
    brake_type?: string

    @Column({ type: 'varchar', nullable: true })
    wheel_formula?: string

    @Column({ type: 'varchar', nullable: true })
    axles_number?: string

    @Column({ type: 'varchar', nullable: true })
    fifth_wheel_height?: string

    @Column({ type: 'varchar', nullable: true })
    trailer_length?: string

    @Column({ type: 'varchar', nullable: true })
    trailer_volume?: string

    @Column({ type: 'varchar', nullable: true })
    euro?: string

    @Column({ type: 'varchar', nullable: true })
    color?: string

    @Column({ type: 'varchar', nullable: true })
    options?: string

    @Column({ type: 'varchar', nullable: true })
    image_url?: string

    @Column('simple-array', { nullable: true })
    image_urls?: string[]

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}
