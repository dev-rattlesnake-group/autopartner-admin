import {
    Controller,
    UseGuards,
    Get,
    Param,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Put,
    Query,
    UseInterceptors,
    UploadedFile,
    Delete,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import {
    Pagination,
    PaginationParams,
} from 'src/decorators/pagination-params.decorator'
import {
    Filtering,
    FilteringParams,
} from 'src/decorators/filtering-params.decorator'
import { SearchingParams } from 'src/decorators/search-params.decorator'
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { RequestAccount } from 'src/types/request-user.type'
import { RequestUser } from 'src/decorators/request-user.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { ProductService } from './product.service'
import { ProductCreateType, Products } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileTypeValidationPipe } from 'src/pipe/file-type-validation.pipe'
import { ApiConsumes } from '@nestjs/swagger'
import { generateFileName } from './helper/generate-filename.helper'
import { ConfigService } from '@nestjs/config'
import { diskStorage } from 'multer'

@Controller('products')
export class ProductController {
    constructor(
        private configService: ConfigService,
        private readonly productService: ProductService
    ) {}
    @Get()
    async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @FilteringParams([])
        filterParams?: Filtering,
        @SearchingParams() searchParams?: string,
        @SortingParams([])
        sortParams?: Sorting
    ): Promise<PageDto<Products>> {
        return this.productService.getProducts(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file: Express.Multer.File, cb) => {
                    cb(null, generateFileName(file.originalname))
                },
            }),
        })
    )
    async createProduct(
        @UploadedFile(new FileTypeValidationPipe(['image/jpeg', 'image/png']))
        file: Express.Multer.File,
        @Body() dto: CreateProductDto,
        @RequestUser() user: RequestAccount
    ) {
        try {
            const createProductDto = structuredClone(dto) as ProductCreateType
            if (file) {
                console.log(file)
                createProductDto.image_url = `${this.configService.get('API_URL')}/files/${file.filename}`
            }
            createProductDto.account_id = user.id
            const product =
                await this.productService.createProduct(createProductDto)
            return product
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
    @Put(':id')
    async updateProduct(
        @UploadedFile(new FileTypeValidationPipe(['image/jpeg', 'image/png']))
        file: Express.Multer.File,
        @Param() id: number,
        @Body() dto: CreateProductDto,
        @RequestUser() user: RequestAccount
    ) {
        try {
            const createProductDto = structuredClone(dto) as ProductCreateType
            if (file) {
                console.log(file)
                createProductDto.image_url = `${this.configService.get('API_URL')}/files/${file.filename}`
            }
            createProductDto.account_id = user.id
            const product = await this.productService.updateProduct(
                createProductDto,
                id
            )
            return product
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
    @Delete(':id')
    async deleteProduct(@Param() id: number) {
        try {
            return await this.productService.deleteProduct(id)
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
