import { ApiProperty } from '@nestjs/swagger';
import {
  EachProductResult,
  GetAllProductResult,
} from 'src/product/application/get-all-products/get-all-products.result';

export class GetProductItem implements EachProductResult {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'RM99.00' })
  price: string;

  @ApiProperty({ example: 'Nasi Lemak 2.0' })
  name: string;

  @ApiProperty({ example: 'This is very good nasi lemak' })
  description: string;
}

export class GetAllProductResponseDTO {
  @ApiProperty({ type: [GetProductItem] })
  readonly products: GetAllProductResult;
}
