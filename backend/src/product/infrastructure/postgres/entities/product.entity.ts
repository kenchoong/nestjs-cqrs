import { OrderProductsEntity } from 'src/orders/instrastructure/postgres/order-product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../../common/db/base.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price = 0.0;

  @Column({ type: 'varchar' })
  name = '';

  @Column({ type: 'varchar' })
  description = '';
}
