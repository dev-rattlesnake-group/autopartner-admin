import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import {
    Filtering,
    FilteringParams,
} from 'src/decorators/filtering-params.decorator'
import { SearchingParams } from 'src/decorators/search-params.decorator'
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { News, NewsCreateType } from './news.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { RequestAccount } from 'src/types/request-user.type'
import { RequestUser } from 'src/decorators/request-user.decorator'

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}
    @Get()
    async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @FilteringParams()
        filterParams?: Filtering,
        @SearchingParams() searchParams?: string,
        @SortingParams(['id'])
        sortParams?: Sorting
    ): Promise<PageDto<News>> {
        return this.newsService.getNews(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    @Get(':id')
    async getOne(@Param() { id }: { id: number }): Promise<News> {
        return this.newsService.getNewsById(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createNews(@Body() dto: NewsCreateType) {
        try {
            const news = await this.newsService.createNews(dto)
            return news
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
    async updateNews(
        @Param() { id }: { id: number },
        @Body() dto: NewsCreateType
    ) {
        try {
            const news = await this.newsService.updateNews(id, dto)
            return news
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
    async deleteNews(@Param() { id }: { id: number }) {
        try {
            return await this.newsService.deleteNews(id)
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
