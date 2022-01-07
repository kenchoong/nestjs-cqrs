import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNumber } from 'class-validator';

/**
 * @description using class validator to valid the request
 * @documentation https://github.com/typestack/class-validator
 */
export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3, example: 'Mee' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ minLength: 4, example: '4.13' })
  readonly price: number;

  @IsString()
  @MinLength(5)
  @ApiProperty({ minLength: 5, example: 'nice mee' })
  readonly description: string;
}
