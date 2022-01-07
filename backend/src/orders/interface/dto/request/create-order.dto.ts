import { ApiProperty } from '@nestjs/swagger';

/**
 * @description Here is the product object, we only need the productId
 */
export class OrderProductDetails {
  @ApiProperty({ format: 'uuid' })
  id: string;
}

/**
 * @description Each product with quantiy and product
 */
export class EachOrderProduct {
  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 36.52 })
  total: number;

  @ApiProperty({ type: OrderProductDetails })
  product: OrderProductDetails;
}

export class OrderProductDto extends Array<EachOrderProduct> {}

/**@description the grand order object */
export class CreateOrderDto {
  @ApiProperty({ format: 'uuid' })
  userId: string;

  @ApiProperty({ example: 6.0 })
  grandTotal: number;

  @ApiProperty({ type: [EachOrderProduct] })
  orderProduct: EachOrderProduct[];
}
