import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { STATUS } from './state.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Post()
  async create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(req.user.id, createOrderDto);
  }

  @Put(':id')
  async changeStatus(
    @Param('orderId') orderId: number,
    @Param('status') status: STATUS,
  ) {
    return this.ordersService.updateStatus(orderId, status);
  }

  @Get('/status/:id')
  async getAllByStatus(@Param() status: STATUS) {
    return this.ordersService.getOrdersByStatus(status);
  }
}
