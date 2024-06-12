import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm'

export class Products1718002136923 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'login',
                        type: 'varchar',
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'password_hash',
                        type: 'varchar',
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
                name: 'categories',
                columns: [
                    {
                        name: 'name',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                    },
                ],
            }),
            true
        )
        await queryRunner.createTable(
            new Table({
                name: 'brands',
                columns: [
                    {
                        name: 'name',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                    },
                ],
            }),
            true
        )
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                    },
                    {
                        name: 'brand',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'int',
                    },
                    {
                        name: 'vehicles_year',
                        comment: 'Год выпуска',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'engine',
                        comment: 'Двигатель',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'transmission',
                        comment: 'Коробка передач',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'max_weight',
                        comment: 'Разрешённая макс. масса',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cabin_type',
                        comment: 'Тип кабины',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'suspension_type',
                        comment: 'Тип подвески',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'suspension_cabin',
                        comment: 'Подвеска кабины',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'suspension_chassis',
                        comment: 'Подвеска шасси',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'brake_type',
                        comment: 'Тип тормозов',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'wheel_formula',
                        comment: 'Колесная формула',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'axles_number',
                        comment: 'Количество осей',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'fifth_wheel_height',
                        comment: 'Высота седельного устройства',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'trailer_volume',
                        comment: 'Объем прицепа',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'trailer_length',
                        comment: 'Длина прицепа',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'euro',
                        comment: 'Класс выхлопа EURO',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'color',
                        comment: 'Цвет',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'options',
                        comment: 'Дополнительные опции',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'image_url',
                        comment: 'URL изображения',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'in_stock',
                        comment: 'В наличие',
                        type: 'bool',
                        default: false,
                    },
                    {
                        name: 'account_id',
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
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['account_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'accounts',
                onDelete: 'CASCADE',
            })
        )
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['category'],
                referencedColumnNames: ['name'],
                referencedTableName: 'categories',
                onDelete: 'CASCADE',
            })
        )
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['brand'],
                referencedColumnNames: ['name'],
                referencedTableName: 'brands',
                onDelete: 'CASCADE',
            })
        )
        await queryRunner.query(
            `INSERT INTO categories (name)  VALUES ('Самосвал'),('Седельный тягач'),('Полуприцеп рефрижератор')`
        )
        await queryRunner.query(
            `INSERT INTO brands (name) VALUES ('Shacman'),('Mercedes-Benz'),('Beiben'),('Krone'),('FAW'),('HOWO')`
        )
        await queryRunner.query(
            `INSERT INTO accounts (login, password_hash, role ) VALUES ('admin','$2a$10$pKXtbTSaM4Cx01mPgXlZC.oGfemWGI/wz.RaOnxMNm4sNK7kW2Kx.','admin')`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
        await queryRunner.dropTable('brands')
        await queryRunner.dropTable('categories')
        await queryRunner.dropTable('accounts')
    }
}
