import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from './configs/typeorm.config'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { AccountModule } from './account/account.module'

import { UploadModule } from './upload/upload.module'
import { NewsModule } from './news/news.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        AuthModule,
        AccountModule,
        ProductModule,
        UploadModule,
        NewsModule,
        FeedbackModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
