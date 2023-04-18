import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { QueryFailedError } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../users/role.enum';
import { Cache } from 'cache-manager';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Category } from './category.entity';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll() {
    const key = `categories`;
    const cachedCategories = await this.cacheManager.get<Category>(key);
    if (cachedCategories) {
      return cachedCategories;
    }
    const categories = await this.categoriesService.findAll();
    await this.cacheManager.set(key, categories);
    return categories;
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.createCategory(category);
  }

  @Delete('/:categoryName')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
