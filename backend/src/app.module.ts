import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/infrastructure/postgres/entities/product.entity';

import { config } from './common/db/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProductModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
