import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { IsNotEmptyObject } from 'class-validator';
import { Category } from '../categories/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: true,
  })
  isAvailable: boolean;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => Category, { cascade: true, eager: true })
  @IsNotEmpty()
  @IsNotEmptyObject()
  category: Category;
}
