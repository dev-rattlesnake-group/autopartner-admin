import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm'

export class Vacancy1718702012680 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vacancies',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'desciption_1',
                        type: 'varchar',
                        isNullable: true,
                    },

                    {
                        name: 'desciption_2',
                        type: 'varchar',
                        isNullable: true,
                    },

                    {
                        name: 'desciption_3',
                        type: 'varchar',
                        isNullable: true,
                    },

                    {
                        name: 'desciption_4',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'desciption_5',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'desciption_6',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'desciption_7',
                        type: 'varchar',
                        isNullable: true,
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        onUpdate: 'CURRENT_TIMESTAMP(6)',
                        default: 'now()',
                    },
                ],
            }),
            true
        )
        await queryRunner.createTable(
            new Table({
                name: 'events',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'expired_date',
                        type: 'date',
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        onUpdate: 'CURRENT_TIMESTAMP(6)',
                        default: 'now()',
                    },
                ],
            }),
            true
        )
        await queryRunner.createTable(
            new Table({
                name: 'event_details',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'event_id',
                        type: 'int',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                ],
            }),
            true
        )
        await queryRunner.createForeignKey(
            'event_details',
            new TableForeignKey({
                columnNames: ['event_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'events',
                onDelete: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vacancies')
        await queryRunner.dropTable('events')
        await queryRunner.dropTable('event_details')
    }
}
