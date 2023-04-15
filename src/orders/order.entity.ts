import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Product } from '../products/product.entity';
import { STATUS } from './state.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
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
}
