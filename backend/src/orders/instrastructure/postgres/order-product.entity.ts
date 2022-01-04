import { BaseEntity } from '../../../common/db/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProductEntity } from '../../../product/infrastructure/postgres/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int' })
  quantity = 0;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productTotal = 0.0;

  @ManyToOne(() => OrderEntity, (order) => order.orderProduct)
  order: OrderEntity;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  product: ProductEntity[];
}
