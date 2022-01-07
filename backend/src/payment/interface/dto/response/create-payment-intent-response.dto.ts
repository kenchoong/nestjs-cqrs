import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentResponseDto {
  @ApiProperty({ example: 'The string return by string' })
  readonly clientSercet: string;
}
