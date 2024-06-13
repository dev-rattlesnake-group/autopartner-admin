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
import { FileTypeValidationPipe } from 'src/pipe/file-type-validation.pipe'
import { ConfigService } from '@nestjs/config'
import { Categories } from './entities/product-category.entity'
import { Brands } from './entities/product-brand.entity'
import { PRODUCT_FILTER_PARAMS } from './product.constant'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CreateBrandDto } from './dto/create-brand.dto'
@Controller('products')
export class ProductController {
    constructor(
        private configService: ConfigService,
        private readonly productService: ProductService
    ) {}
    @Get()
    async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @FilteringParams(PRODUCT_FILTER_PARAMS)
        filterParams?: Filtering,
        @SearchingParams() searchParams?: string,
        @SortingParams(PRODUCT_FILTER_PARAMS)
        sortParams?: Sorting
    ): Promise<PageDto<Products>> {
        return this.productService.getProducts(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    @Get('categories')
    async getCategories(): Promise<Categories[]> {
        return this.productService.getCategories()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('categories')
    async createCategory(@Body() dto: CreateCategoryDto): Promise<Categories> {
        return this.productService.createCategory(dto.name)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put('categories/:name')
    async updateCategoriy(
        @Body() dto: CreateCategoryDto,
        @Param() { name }: { name: string }
    ) {
        try {
            return this.productService.updateCategory(name, dto.name)
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
    @Delete('categories/:name')
    async deleteCategory(@Param() { name }: { name: string }) {
        try {
            return await this.productService.deleteCategory(name)
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

    @Get('brands')
    async getBrands(): Promise<Brands[]> {
        return this.productService.getBrands()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('brands')
    async createBrand(@Body() dto: CreateBrandDto): Promise<Categories> {
        return this.productService.createBrand(dto.name)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put('brands/:name')
    async updateBrand(
        @Param() { name }: { name: string },
        @Body() dto: CreateBrandDto
    ) {
        return this.productService.updateBrand(name, dto.name)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete('brands/:name')
    async deleteBrand(@Param() { name }: { name: string }) {
        try {
            return await this.productService.deleteBrand(name)
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

    @Get(':id')
    async get(@Param() id: { id: number }): Promise<Products> {
        return this.productService.getProduct(id.id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createProduct(
        @Body() dto: CreateProductDto,
        @RequestUser() user: RequestAccount
    ) {
        try {
            const createProductDto = structuredClone(dto) as ProductCreateType
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
        @Param() id: { id: number },
        @Body() dto: CreateProductDto,
        @RequestUser() user: RequestAccount
    ) {
        try {
            const createProductDto = structuredClone(dto) as ProductCreateType
            createProductDto.account_id = user.id
            const product = await this.productService.updateProduct(
                createProductDto,
                id.id
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
    async deleteProduct(@Param() id: { id: number }) {
        try {
            return await this.productService.deleteProduct(id.id)
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
