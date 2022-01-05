import { ApiProperty } from '@nestjs/swagger';

class response {
  @ApiProperty({ format: 'uuid' })
  readonly order: string;
}

export class CreateOrderResponseDto {
  @ApiProperty()
  readonly id: response;
}
