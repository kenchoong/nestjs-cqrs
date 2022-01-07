import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionResponseDto {
  @ApiProperty()
  readonly url: string;
}
