import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from 'src/product/infrastructure/postgres/entities/base.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  price = '';

  @Column({ type: 'varchar' })
  name = '';

  @Column({ type: 'varchar' })
  description = '';
}
