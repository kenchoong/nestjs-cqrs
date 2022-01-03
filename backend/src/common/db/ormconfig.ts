import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../users/infrastructure/postgres/user.entity';
import { ProductEntity } from '../../product/infrastructure/postgres/entities/product.entity';

export const config: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 6543,
  username: 'postgres',
  password: 'postgres',
  database: 'lavax_db',
  entities: [ProductEntity, UserEntity],
  synchronize: false,
  migrations: [getMigrationDirectory()],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/common/db/migrations',
  },
};

/**
 * @description When in production, in dist is under /config/migration/the-file,
 * when I testing, localhost, then in /common/config/migrations/the-file,
 * others stuff, typeorm will handle
 * @returns string Directory path to put the migration file
 */
function getMigrationDirectory() {
  console.log(`${__dirname}`);
  return process.env.NODE_ENV === 'migration'
    ? `src/common/migrations/**/*{.ts,.js}`
    : `${__dirname}/migrations/**/*{.ts,.js}`;
}
