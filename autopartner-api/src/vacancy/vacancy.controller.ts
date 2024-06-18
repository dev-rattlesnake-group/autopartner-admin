import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'

import { PageOptionsDto } from 'src/dto/page-options.dto'
import {
    Filtering,
    FilteringParams,
} from 'src/decorators/filtering-params.decorator'
import { SearchingParams } from 'src/decorators/search-params.decorator'
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { RequestAccount } from 'src/types/request-user.type'
import { RequestUser } from 'src/decorators/request-user.decorator'
import { VacancyService } from './vacancy.service'
import { Vacancies, VacancyCreateType } from './vacancy.entity'

@Controller('vacancies')
export class VacancyController {
    constructor(private readonly service: VacancyService) {}
    @Get()
    async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @FilteringParams()
        filterParams?: Filtering,
        @SearchingParams() searchParams?: string,
        @SortingParams(['id'])
        sortParams?: Sorting
    ): Promise<PageDto<Vacancies>> {
        return this.service.get(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    @Get(':id')
    async getOne(@Param() { id }: { id: number }): Promise<Vacancies> {
        return this.service.getById(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async create(@Body() dto: VacancyCreateType) {
        try {
            const data = await this.service.create(dto)
            return data
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: err?.message || err?.details || err,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: err,
                }
            )
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put(':id')
    async update(
        @Param() { id }: { id: number },
        @Body() dto: VacancyCreateType
    ) {
        try {
            const data = await this.service.update(id, dto)
            return data
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: err?.message || err?.details || err,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: err,
                }
            )
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param() { id }: { id: number }) {
        try {
            return await this.service.delete(id)
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: err?.message || err?.details || err,
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: err,
                }
            )
        }
    }
}
