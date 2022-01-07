import { IQueryResult } from '@nestjs/cqrs';

export class GetUserByUsernameResult implements IQueryResult {
  readonly id: string;
  readonly username: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
}
