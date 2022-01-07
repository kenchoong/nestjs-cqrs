import { BaseEntity } from '../../../common/db/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderProductsEntity } from './order-product.entity';
import { UserEntity } from '../../../users/infrastructure/postgres/user.entity';

@Entity()
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', default: 'PENDING' })
  orderStatus = 'PENDING';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  grandTotal = 0.0;

  @Column({ type: 'varchar', default: null })
  orderPaymentIntentId: string | null;

  @OneToMany(() => OrderProductsEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  @JoinColumn()
  orderProduct: OrderProductsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
