import { ApiProperty } from '@nestjs/swagger';
import { GetProductByIdResult } from 'src/product/application/get-product-by-id/get-product-by-id.result';

export class GetProductByIdResponseDto implements GetProductByIdResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'RM 99.00' })
  readonly price: string;

  @ApiProperty({ example: 'Nasi Lemak 3.0' })
  readonly name: string;

  @ApiProperty({ example: 'Ini Nasi Lemak sedap' })
  readonly description: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
