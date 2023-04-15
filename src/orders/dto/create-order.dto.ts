import { ArrayNotEmpty } from '@nestjs/class-validator';

export class CreateOrderDto {
  @ArrayNotEmpty()
  ProductsIds: number[];
}
