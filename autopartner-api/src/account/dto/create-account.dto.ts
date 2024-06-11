import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

export class AccountCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5, {
        message: 'Password must be at least 5 characters',
    })
    @MaxLength(50, {
        message: 'Password must be maximum 50 characters',
    })
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4, {
        message: 'Login must be at least 4 characters',
    })
    @MaxLength(50, {
        message: 'Login must be maximum 50 characters',
    })
    @IsString()
    login: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role: string
}
