import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    HttpException,
    HttpStatus,
    Delete,
    UseGuards,
    Put,
    Query,
} from '@nestjs/common'
import { AccountService } from './account.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Accounts } from './entities/account.entity'
import { AccountCreateDto } from './dto/create-account.dto'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import {
    Filtering,
    FilteringParams,
} from 'src/decorators/filtering-params.decorator'
import { SearchingParams } from 'src/decorators/search-params.decorator'
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @FilteringParams()
        filterParams?: Filtering,
        @SearchingParams() searchParams?: string,
        @SortingParams(['id'])
        sortParams?: Sorting
    ): Promise<PageDto<Accounts>> {
        return this.accountService.get(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async create(@Body() dto: AccountCreateDto): Promise<Accounts> {
        try {
            const account = await this.accountService.create(dto)
            return account
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
        @Body() dto: { password: string }
    ) {
        try {
            const account = await this.accountService.changePassword(
                id,
                dto.password
            )
            return account
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
