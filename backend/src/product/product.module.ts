import { Module } from '@nestjs/common';
import { ProductController } from './interface/product.controller';
import { CqrsModule } from '@nestjs/cqrs';

//import { CommandHandler } from './application/command/handler';
import { QueryHandler } from './application/queries/handler';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [...QueryHandler],
})
export class ProductModule {}
