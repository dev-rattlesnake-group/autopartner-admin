import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Products } from './entities/product.entity'
import { ProductRepository } from './product.repository'

@Module({
    imports: [
        MulterModule.register({ dest: './files' }),
        TypeOrmModule.forFeature([Products]),
    ],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
})
export class ProductModule {}
