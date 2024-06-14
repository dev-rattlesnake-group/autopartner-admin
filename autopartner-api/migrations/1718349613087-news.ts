import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class News1718349613087 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'news',
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
                        name: 'context',
                        type: 'varchar',
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'date',
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
                name: 'feedbacks',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                    },
                    {
                        name: 'author',
                        type: 'varchar',
                    },
                    {
                        name: 'company',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'int',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('news')
        await queryRunner.dropTable('feedbacks')
    }
}
