import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { raw } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use('/payment/stripe-webhook', raw({ type: 'application/json' }));

  const config = new DocumentBuilder()
    .setTitle('Lavax stuff')
    .setDescription('API consist of Product, Order, Stripe API')
    .setVersion('1.0')
    .addTag('Lavax')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3003);
}
bootstrap();
