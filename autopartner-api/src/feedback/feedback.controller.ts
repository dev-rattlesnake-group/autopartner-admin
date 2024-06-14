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
import { PageOptionsDto } from 'src/dto/page-options.dto'
import {
    Filtering,
    FilteringParams,
} from 'src/decorators/filtering-params.decorator'
import { SearchingParams } from 'src/decorators/search-params.decorator'
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Roles } from 'src/decorators/role.decorator'
import { Role } from 'src/constant/role.enum'
import { FeedbackService } from './feedback.service'
import { Feedbacks, FeedbackCreateType } from './feedback.entity'

@Controller('feedbacks')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}
    @Get()
    async getAll(
        @Query() pageOptionsDto: PageOptionsDto,
        @FilteringParams()
        filterParams?: Filtering,
        @SearchingParams() searchParams?: string,
        @SortingParams(['id'])
        sortParams?: Sorting
    ): Promise<PageDto<Feedbacks>> {
        return this.feedbackService.getFeedbacks(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createFeedback(@Body() dto: FeedbackCreateType) {
        try {
            const news = await this.feedbackService.createFeedback(dto)
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
    async updateFeedback(
        @Param() { id }: { id: number },
        @Body() dto: FeedbackCreateType
    ) {
        try {
            const news = await this.feedbackService.updateFeedback(id, dto)
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
    async deleteFeedback(@Param() { id }: { id: number }) {
        try {
            return await this.feedbackService.deleteFeedback(id)
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
