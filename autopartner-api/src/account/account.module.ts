import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { Accounts } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
})
export class AccountModule {}
