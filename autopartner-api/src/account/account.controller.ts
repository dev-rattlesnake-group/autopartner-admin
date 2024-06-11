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
} from '@nestjs/common'
import { AccountService } from './account.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Accounts } from './entities/account.entity'
import { AccountCreateDto } from './dto/create-account.dto'
@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    async get(): Promise<{ accounts: Accounts[] }> {
        try {
            const accounts = await this.accountService.findAll()
            return { accounts }
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
}
