import { AccountRepository } from './../account/account.repository';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly AccountRepository: AccountRepository,
    private readonly JwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const account = await this.AccountRepository.findByLogin(signInDto.login);
    if (!account) {
      throw new UnauthorizedException('Account not found');
    }
    const isPasswordCorrect = await compare(
      signInDto.password,
      account.password_hash,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Bad password');
    }
    const { login, password_hash, role, id } = account;
    const accessToken = await this.JwtService.signAsync({
      id,
      login,
      password_hash,
      role,
    });
    return { id, login, role, access_token: accessToken };
  }
}
