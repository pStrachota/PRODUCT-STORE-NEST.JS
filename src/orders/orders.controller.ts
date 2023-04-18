import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { STATUS } from './state.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../users/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get('/self')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findSelfOrders(@Req() req) {
    return await this.ordersService.findSelfOrders(req.user.id);
  }

  @Post()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(req.user.id, createOrderDto);
  }

  @Put(':id/:status')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async changeStatus(
    @Req() req,
    @Param('id') orderId: number,
    @Param('status') status: STATUS,
  ) {
    return this.ordersService.updateStatus(req.user.id, orderId, status);
  }

  @Get('/:status/')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllByStatus(@Param() status: STATUS) {
    return this.ordersService.getOrdersByStatus(status);
  }

  @Get('self/:status')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findSelfOrdersByStatus(@Req() req, @Param() status: STATUS) {
    return this.ordersService.findSelfOrdersByStatus(req.user.id, status);
  }
}
