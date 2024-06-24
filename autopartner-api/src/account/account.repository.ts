import { DataSource, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Accounts } from './entities/account.entity'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageMetaDto } from 'src/dto/page-meta.dto'

@Injectable()
export class AccountRepository extends Repository<Accounts> {
    constructor(private dataSource: DataSource) {
        super(Accounts, dataSource.createEntityManager())
    }
    async findByLogin(login: string) {
        return await this.findOne({ where: { login } })
    }
    async updateById(id: number, dto: Accounts) {
        return await this.update(id, dto)
    }

    async getAccounts(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Accounts>> {
        const queryBuilder = this.createQueryBuilder('accounts')
        queryBuilder
            .orderBy('accounts.created_at', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

        if (filterParams) {
            Object.keys(filterParams).forEach((f) => {
                queryBuilder.andWhere(`accounts.${f} IN (:...${f})`, {
                    [f]: filterParams[f],
                })
            })
        }

        if (searchParams) {
            queryBuilder.andWhere('accounts.login LIKE :search', {
                search: `%${searchParams}%`,
            })
        }
        if (sortParams) {
            const sortParamDirectoin = sortParams.direction.toUpperCase() as
                | 'ASC'
                | 'DESC'
            queryBuilder.orderBy(
                `accounts.${sortParams.property}`,
                sortParamDirectoin
            )
        }

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageMetaDto)
    }
}
