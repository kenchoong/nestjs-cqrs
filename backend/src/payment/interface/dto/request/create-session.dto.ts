import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDTO {
  @ApiProperty({ format: 'uuid' })
  orderId: string;
}
