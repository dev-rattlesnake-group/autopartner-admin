import { Injectable } from '@nestjs/common'

import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { FeedbackRepository } from './feedback.repository'
import { Feedbacks, FeedbackCreateType } from './feedback.entity'

@Injectable()
export class FeedbackService {
    constructor(private readonly feedbackRepository: FeedbackRepository) {}
    async getFeedbacks(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<Feedbacks>> {
        return this.feedbackRepository.getFeedbacks(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }
    async createFeedback(dto: FeedbackCreateType) {
        return this.feedbackRepository.save(dto)
    }
    async updateFeedback(id: number, newsDto: any) {
        return await this.feedbackRepository.updateFeedback(id, newsDto)
    }
    async deleteFeedback(id: number) {
        return await this.feedbackRepository.deleteFeedback(id)
    }
    async getFeedbackById(id: number) {
        return await this.feedbackRepository.findOne({ where: { id } })
    }
}
