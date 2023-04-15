import { IsNotEmpty, IsPositive } from '@nestjs/class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsPositive()
  price: number;

  @IsPositive()
  weight: number;

  @IsNotEmpty()
  categoryName: string;
}
