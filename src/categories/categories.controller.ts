import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { QueryFailedError } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.createCategory(category);
  }

  @Delete('/:categoryName')
  async deleteCategory(@Param('categoryName') categoryName: string) {
    try {
      const category = await this.categoriesService.deleteCategory(
        categoryName,
      );
      if (!category) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return category;
    } catch (e) {
      const err = e as Error;
      this.categoriesService.logger.error(err.message);
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          'Incorrect Category Name',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:categoryName')
  async updateCategory(
    @Req() req,
    @Param('categoryName') categoryName: string,
    @Body() category: UpdateCategoryDto,
  ) {
    try {
      const updateCategory = await this.categoriesService.updateCategory(
        category,
        categoryName,
      );
      if (!updateCategory) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return updateCategory;
    } catch (e) {
      const err = e as Error;
      this.categoriesService.logger.error(err.message);
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          'Incorrect Category Name',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
