import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
