import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        })
    )
    app.setGlobalPrefix('api')
    const config = new DocumentBuilder()
        .setTitle('AUTOPARTNER-API')
        .setDescription('The API description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document)
    app.enableCors({
        origin: [
            'http://5.35.90.180/',
            'http://localhost:4000',
            'http://localhost',
            'http://localhost:3000',
            'http://0.0.0.0',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    })
    await app.listen(3000)
}
bootstrap()
