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

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
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

  async updateStatus(orderId: number, status: STATUS): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({
      id: orderId,
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
    const status = STATUS.NOT_CONFIRMED;
    const Products = await this.productRepository.findByIds(
      createOrderDto.ProductsIds.map((id) => id),
    );

    const fullOrder = {
      status,
      Products,
    };

    await this.ordersRepository.save(fullOrder);
    return { message: 'Order created' };
  }
}
