import { User } from './user';

export class UserRepo {
  create: () => void;
  findByUsername: (username: string) => Promise<User>;
}
