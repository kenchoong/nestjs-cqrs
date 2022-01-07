export class User {
  readonly id: string;
  readonly username: string;
  readonly createdAt: Date | null;
}

export interface UserQuery {
  /**
   *@description: Get a user by his username
   *@param username string
   */
  findByUsername: (username: string) => Promise<User>;
}
