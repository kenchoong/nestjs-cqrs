import { UnprocessableEntityException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

/**
 * @description we only have this when create
 */
export type UserEssentialProperties = Required<{
  readonly id: string;
  readonly username: string;

  //readonly email: string;
}>;

/**
 * @description: reason to do this is because when create that time we dont have this data
 */
export type UserOptionalProperties = Partial<{
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;
}>;

export type UserProperties = UserEssentialProperties &
  Required<UserOptionalProperties>;

export interface User {
  /**
   * @description: return the properties of the User
   */
  properties: () => UserProperties;

  /**
   * @description validate the email before save to db
   * @param username (string)
   */
  validateUsername: (username: string) => void;

  /**
   * @description: Nestjs CQRS commit the command
   * @refer https://docs.nestjs.com/recipes/cqrs#events
   */
  commit: () => void;
}

export class UserImplement extends AggregateRoot implements User {
  readonly id: string;
  readonly username: string;
  readonly updatedAt: Date | null;
  readonly createdAt: Date | null;
  readonly deletedAt: Date | null;
  readonly version: number;

  constructor(
    userProperties: UserEssentialProperties & UserOptionalProperties,
  ) {
    super();
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      version: this.version,
    };
  }
  validateUsername(username: string) {
    if (username === '')
      throw new UnprocessableEntityException('Username is empty');

    if (username.length < 5)
      throw new UnprocessableEntityException(
        'Username must more than 5 characters',
      );
  }
}
