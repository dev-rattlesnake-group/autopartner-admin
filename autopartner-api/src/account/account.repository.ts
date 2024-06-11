import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Accounts } from './entities/account.entity';

@Injectable()
export class AccountRepository extends Repository<Accounts> {
  constructor(private dataSource: DataSource) {
    super(Accounts, dataSource.createEntityManager());
  }
  async findByLogin(login: string) {
    return await this.findOne({ where: { login } });
  }
}
