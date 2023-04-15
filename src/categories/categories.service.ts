import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  public readonly logger = new Logger('CategoryService');

  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async getCategoryByName(categoryName: string): Promise<Category> {
    return this.categoriesRepository.findOneBy({ categoryName: categoryName });
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  async deleteCategory(categoryName: string) {
    return this.categoriesRepository.delete({ categoryName: categoryName });
  }

  async updateCategory(category: UpdateCategoryDto, categoryName: string) {
    Object.keys(category).forEach((key) => {
      if (!category[key]) {
        delete category[key];
      }
    });
    const dbCategory = await this.categoriesRepository.findOneBy({
      categoryName: categoryName,
    });
    if (!dbCategory) {
      throw new HttpException(
        'Incorrect Category Name',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoriesRepository.save({
      ...dbCategory,
      ...category,
    });
  }
}
