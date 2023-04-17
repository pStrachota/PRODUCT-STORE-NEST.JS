import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { STATUS } from './state.enum';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async getOrdersByStatus(status: STATUS): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { status: status },
    });
  }

  async updateStatus(
    userId: string,
    orderId: number,
    status: STATUS,
  ): Promise<Order> {
    const user = await this.userRepository.findOneBy({ id: userId });

    const order = await this.ordersRepository.findOneBy({
      id: orderId,
      user,
    });

    const products: Product[] = order.products;

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === 'completed') {
      throw new BadRequestException('Order already completed');
    }

    if (status === STATUS.COMPLETED) {
      products.forEach((product) => {
        product.isAvailable = false;
      });
    }

    order.status = status;

    return this.ordersRepository.save(order);
  }

  async createOrder(id, createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: id });

    const status = STATUS.NOT_CONFIRMED;
    const Products = await this.productRepository.findByIds(
      createOrderDto.ProductsIds.map((id) => id),
    );

    Products.forEach((product) => {
      if (!product.isAvailable) {
        throw new BadRequestException('Product is not available');
      }
      product.isAvailable = false;
    });
    await this.productRepository.save(Products);

    const fullOrder = {
      user,
      status,
      Products,
    };

    await this.ordersRepository.save(fullOrder);
    return { message: 'Order created' };
  }

  async findSelfOrdersByStatus(id, status: STATUS) {
    const user = await this.userRepository.findOneBy({ id: id });

    return this.ordersRepository.find({
      where: {
        user,
        status: status,
      },
    });
  }

  async findSelfOrders(id) {
    const user = await this.userRepository.findOneBy({ id: id });

    return await this.ordersRepository.find({
      where: { user },
    });
  }
}
