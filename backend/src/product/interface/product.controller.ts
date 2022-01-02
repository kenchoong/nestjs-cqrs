import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../application/create-product/create-product.command';
import { GetAllProductsQuery } from '../application/get-all-products/get-all-products.query';
import { GetProductByIdQuery } from '../application/get-product-by-id/get-product-by-id.query';

import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductDto } from './dto/get-all-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    const { name, price, description } = body;
    return await this.commandBus.execute(
      new CreateProductCommand(name, price, description),
    );
  }

  @Get()
  async findAll(@Query() queryDto: GetAllProductDto) {
    return await this.queryBus.execute(
      new GetAllProductsQuery(queryDto.offset, queryDto.limit),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProductByIdQuery(id));
  }
}
