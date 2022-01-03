import { UserRepository } from 'src/users/domain/repository';
import { User } from 'src/users/domain/user';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserRepositoryImplement implements UserRepository {
  async newUserId(): Promise<string> {
    const emptyUser = new UserEntity();
    const entity = await getRepository(UserEntity).save(emptyUser);
    return entity.id;
  }
  async create(data: User): Promise<void> {
    const userEntity = this.modelToEntity(data);
    await getRepository(UserEntity).save(userEntity);
  }

  private modelToEntity(model: User): UserEntity {
    const properties = model.properties();

    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }
}
