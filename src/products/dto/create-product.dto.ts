import { IsNotEmpty, IsPositive } from '@nestjs/class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsPositive()
  price: number;

  @IsNotEmpty()
  categoryName: string;
}
