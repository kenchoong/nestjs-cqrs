import { UnprocessableEntityException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export type UserProperties = Required<{
  readonly id: string;
  readonly username: string;
  //readonly email: string;
}>;

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

  constructor(userProperties: UserProperties) {
    super();
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      username: this.username,
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
