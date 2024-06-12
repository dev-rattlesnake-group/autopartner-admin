import {
    Controller,
    Post,
    Get,
    Res,
    Param,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    ParseFilePipeBuilder,
    HttpStatus,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
const MAX_IMAGE_SIZE_IN_BYTES = 4 * 1024 * 1024
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png']
import { generateFileName } from './helpers/generate-file-name.helper'
import { FileTypeValidationPipe } from 'src/pipe/file-type-validation.pipe'

@Controller('upload')
export class UploadController {
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('image')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file: Express.Multer.File, cb) => {
                    cb(null, generateFileName(file.originalname))
                },
            }),
            // fileFilter: imageFileFilter,
        })
    )
    public async uploadFile(
        @UploadedFile(new FileTypeValidationPipe(['image/jpeg', 'image/png']))
        file: Express.Multer.File
    ) {
        console.log(file)
        return {
            statusCode: 200,
            data: file.filename,
        }
    }
    @Get('/:filename')
    async getFile(@Param('filename') filename: string, @Res() res: any) {
        res.sendFile(filename, { root: 'files' })
    }
}
