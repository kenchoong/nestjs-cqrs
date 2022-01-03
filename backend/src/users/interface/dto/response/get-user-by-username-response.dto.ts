import { ApiProperty } from '@nestjs/swagger';
import { GetUserByUsernameResult } from 'src/users/application/get-user-by-username/get-user-by-username.result';

export class GetUserByUsernameResponseDTO implements GetUserByUsernameResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'kenchoong012' })
  readonly username: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
