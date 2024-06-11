import { AuthService } from './auth.service'
import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    HttpException,
} from '@nestjs/common'
import { SignInDto } from './dto/signin.dto'

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post()
    async signIn(@Body() dto: SignInDto) {
        try {
            const account = await this.AuthService.signIn(dto)
            return account
        } catch (err) {
            console.log(err)
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
