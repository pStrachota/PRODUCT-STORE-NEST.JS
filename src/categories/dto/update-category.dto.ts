import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  categoryName: string;
}
