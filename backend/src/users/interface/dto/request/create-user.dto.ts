import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(5)
  @ApiProperty({ minLength: 5, example: 'kenchoong' })
  readonly username: string;
}
