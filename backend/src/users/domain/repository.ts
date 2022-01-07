import { UserEntity } from '../infrastructure/postgres/user.entity';
import { User } from './user';

export class UserRepository {
  /**
   * @description insert a empty user to db, and return an UserId
   */
  newUserId: () => Promise<string>;

  /**
   * @description Insert user into database
   */
  create: (data: User) => Promise<void>;

  /**
   * @description Find user by id
   */
  findById: (id: string) => Promise<UserEntity | null>;
}
