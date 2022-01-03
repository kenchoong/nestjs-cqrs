import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from '../../../../common/db/base.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price = '';

  @Column({ type: 'varchar' })
  name = '';

  @Column({ type: 'varchar' })
  description = '';
}
