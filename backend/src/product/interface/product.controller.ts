import { Controller, Get, Param, Post, Body, Query, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateProductCommand } from '../application/create-product/create-product.command';
import { GetAllProductsQuery } from '../application/get-all-products/get-all-products.query';
import { GetProductByIdQuery } from '../application/get-product-by-id/get-product-by-id.query';

import { CreateProductDto } from './dto/request/create-product.dto';
import { GetAllProductDto } from './dto/request/get-all-product.dto';
import { GetAllProductResponseDTO } from './dto/response/get-all-products-response.dto';
import { GetProductByIdResponseDto } from './dto/response/get-product-by-id-response.dto';
import { ResponseDescription } from './response-description';

/**
 * @description API response is arrage using Nestjs Swagger
 * @document https://docs.nestjs.com/openapi/introduction#installation
 * @refer https://github.com/nestjs/nest/blob/master/sample/11-swagger/src/cats/cats.controller.ts#L19
 *
 * @description To make the response message, even easier to manage, I make it to a separate file
 * @description The response data is defined in result class inside application layer
 * @example  application/get-all-products/get-all-products.result.ts
 *
 * @description The organize insie reponseDto folder
 * @refer /dto/response/get-all-products-response.dto.ts
 *
 * @description For the decorator
 * @refer https://docs.nestjs.com/openapi/decorators
 */
@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiUnprocessableEntityResponse({
    description: ResponseDescription.UNPROCESSABLE_ENTITY,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async create(@Body() body: CreateProductDto) {
    const { name, price, description } = body;
    return await this.commandBus.execute(
      new CreateProductCommand(name, price, description),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: GetAllProductResponseDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findAll(@Query() queryDto: GetAllProductDto) {
    return await this.queryBus.execute(
      new GetAllProductsQuery(queryDto.offset, queryDto.limit),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: GetProductByIdResponseDto,
  })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new GetProductByIdQuery(id));
  }
}
