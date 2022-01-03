import { UserQuery, User } from 'src/users/domain/query';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserQueryImplement implements UserQuery {
  /**
   * @description get the user with his username
   */
  async findByUsername(username: string): Promise<undefined | User> {
    return this.convertUserFromEntity(
      await getRepository(UserEntity).findOne({ username: username }),
    );
  }

  /**
   * @description Coverts the response from DB to an object we want
   * @param UserEntity
   * @returns
   */
  private convertUserFromEntity(entity?: UserEntity): User | undefined {
    return entity ? { ...entity, createdAt: entity.createdAt } : undefined;
  }
}
