import { ApiProperty } from '@nestjs/swagger';
import { CreateUserResult } from 'src/users/application/create-user/create-user.result';

export class CreateUserResponseDTO implements CreateUserResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'kenchoong' })
  username: string;
}
