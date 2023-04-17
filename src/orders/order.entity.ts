import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Product } from '../products/product.entity';
import { STATUS } from './state.enum';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.NOT_CONFIRMED,
  })
  status: STATUS;

  @OneToMany(() => Product, (product) => product.id, {
    cascade: true,
    eager: true,
  })
  @IsNotEmpty()
  products: Product[];

  @ManyToOne(() => User, { cascade: true, eager: true })
  @IsNotEmpty()
  user: User;
}
