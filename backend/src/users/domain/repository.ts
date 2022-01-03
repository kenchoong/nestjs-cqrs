import { User } from './user';

export class UserRepository {
  newUserId: () => Promise<string>;
  create: (data: User) => Promise<void>;
}
