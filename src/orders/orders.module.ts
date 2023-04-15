import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { Category } from '../categories/category.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, Category])],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, ProductsService, CategoriesService],
})
export class OrdersModule {}
