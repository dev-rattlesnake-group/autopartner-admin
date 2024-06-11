import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { Accounts } from './entities/account.entity';
import { AccountCreateDto } from './dto/create-account.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}
  async create(account: AccountCreateDto): Promise<Accounts> {
    const salt = genSaltSync(10);
    const password_hash = hashSync(account.password, salt);
    delete account.password;
    const accountDto = {
      ...account,
      password_hash,
    };
    return this.accountRepository.save(accountDto);
  }
  async findAll() {
    return this.accountRepository.find();
  }
  async findByLogin(login: string) {
    return this.accountRepository.findByLogin(login);
  }
}
