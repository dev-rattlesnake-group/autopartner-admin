import { Injectable } from '@nestjs/common'
import { NewsRepository } from './news.repository'
import { PageOptionsDto } from 'src/dto/page-options.dto'
import { Filtering } from 'src/decorators/filtering-params.decorator'
import { Sorting } from 'src/decorators/sorting.decorator'
import { PageDto } from 'src/dto/pagination.dto'
import { News } from './news.entity'

@Injectable()
export class NewsService {
    constructor(private readonly newsRepository: NewsRepository) {}
    async getNews(
        pageOptionsDto: PageOptionsDto,
        filterParams: Filtering,
        searchParams: string,
        sortParams: Sorting
    ): Promise<PageDto<News>> {
        return this.newsRepository.getNews(
            pageOptionsDto,
            filterParams,
            searchParams,
            sortParams
        )
    }
    async createNews(newsDto: any) {
        return this.newsRepository.save(newsDto)
    }
    async updateNews(id: number, newsDto: any) {
        return await this.newsRepository.update(id, newsDto)
    }
    async deleteNews(id: number) {
        return await this.newsRepository.delete(id)
    }
    async getNewsById(id: number) {
        return await this.newsRepository.findOne({ where: { id } })
    }
}
