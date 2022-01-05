import { UserEntity } from '../infrastructure/postgres/user.entity';
import { User } from './user';

export class UserRepository {
  newUserId: () => Promise<string>;
  create: (data: User) => Promise<void>;

  findById: (id: string) => Promise<UserEntity | null>;
}
