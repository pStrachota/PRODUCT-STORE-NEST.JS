import { IsNotEmpty, IsOptional, IsPositive } from '@nestjs/class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsPositive()
  price: number;
}
