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
            'https://main--frabjous-souffle-3a27d9.netlify.app',
            'https://main--frabjous-souffle-3a27d9.netlify.app/catalog',
            'https://main--frabjous-souffle-3a27d9.netlify.app/news',
            'https://main--frabjous-souffle-3a27d9.netlify.app/feedbacks',
            'http://www.autopartner.hellorf6.beget.tech',
            'https://www.autopartner.hellorf6.beget.tech/',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    })
    await app.listen(3000)
}
bootstrap()
