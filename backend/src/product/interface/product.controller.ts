import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllProductsQuery } from '../application/queries/impl/get-all-products.query';
import { GetProductByIdQuery } from '../application/queries/impl/get-product-by-id.query';

/*
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
*/

@Controller('product')
export class ProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async findAll() {
    return await this.queryBus.execute(new GetAllProductsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProductByIdQuery(id));
  }
}
