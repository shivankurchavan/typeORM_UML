import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';

@Entity()
@Unique(['orderNumber'])
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: string;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
