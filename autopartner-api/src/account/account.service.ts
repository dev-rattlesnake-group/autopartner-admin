import { HttpStatus, Injectable } from '@nestjs/common'
import { AccountRepository } from './account.repository'
import { Accounts } from './entities/account.entity'
import { AccountCreateDto } from './dto/create-account.dto'
import { genSaltSync, hashSync } from 'bcryptjs'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'

@Injectable()
export class AccountService {
    constructor(private accountRepository: AccountRepository) {}
    async create(account: AccountCreateDto): Promise<Accounts> {
        const salt = genSaltSync(10)
        const password_hash = hashSync(account.password, salt)
        delete account.password
        const accountDto = {
            ...account,
            ...{ role: 'admin' },
            password_hash,
        }
        return this.accountRepository.save(accountDto)
    }
    async get(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Accounts>> {
        const result = await this.accountRepository.getAccounts(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
        console.log(result.data)
        return result
    }

    async findByLogin(login: string) {
        return this.accountRepository.findByLogin(login)
    }

    async remove(id: number) {
        const result = await this.accountRepository.delete(id)
        if (result.affected === 1) {
            return HttpStatus.OK
        } else {
            return HttpStatus.NOT_FOUND
        }
    }
    async changePassword(id: number, password: string) {
        const salt = genSaltSync(10)
        const password_hash = hashSync(password, salt)
        return this.accountRepository.update(id, { password_hash })
    }
}
