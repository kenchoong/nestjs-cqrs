import { OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { ProductEntity } from './product/infrastructure/postgres/entities/product.entity';
//import { ConfigModule, ConfigService } from '@nestjs/config';

class DBConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

export class AppService implements OnModuleInit, OnModuleDestroy {
  private databaseConnection?: Connection | void;

  /**
   * @description close the db when the server is down
   */
  async onModuleDestroy() {
    if (this.databaseConnection) await this.databaseConnection.close();
  }

  /**
   * @description Write the database connection here
   * @refer https://docs.nestjs.com/fundamentals/lifecycle-events#asynchronous-initialization
   */
  async onModuleInit() {
    const entities = [ProductEntity];

    this.databaseConnection = await createConnection({
      ...this.loadPostgresConfig(),
      type: 'postgres',
      entities,
    }).catch((error: Error) => this.failToConnectDb(error));
  }

  /**
   * @description: Load the config from environment
   * @refer   https://typeorm.io/#/connection/creating-a-new-connection
   */
  loadPostgresConfig(): DBConfig {
    return {
      host: 'localhost',
      port: 6543,
      username: 'postgres',
      password: 'postgres',
      database: 'lavax_db',
      synchronize: true,
      logging: false,
    };
  }

  failToConnectDb(error: Error): void {
    console.log(error);
  }
}
