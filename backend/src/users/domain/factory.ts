import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { User, UserImplement, UserProperties } from './user';

/**
 * @description Sometimes we need a factory to get back the User AggregateRoot
 * @refer: https://docs.nestjs.com/recipes/cqrs#events under kill-dragon.handler.ts example
 *
 */
export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  /**
   * @description Create user domain object
   * @param id
   * @param username
   * @returns User aggreateRoot
   */
  create(id: string, username: string): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({ id, username }),
    );
  }

  /**
   * @description Restructure Properties into a User Domain object
   * @param UserProperties
   * @returns User aggreateRoot
   */
  restructure(properties: UserProperties): User {
    return;
  }
}
