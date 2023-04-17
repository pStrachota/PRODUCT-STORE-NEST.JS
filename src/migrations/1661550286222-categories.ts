import { MigrationInterface, QueryRunner } from 'typeorm';

export class categories1681550286222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      { categoryName: 'SPORT' },
      { categoryName: 'CLOTHES' },
      { categoryName: 'ELECTRONIC' },
      { categoryName: 'OTHER' },
      { categoryName: 'FOOD' },
      { categoryName: 'BOOK' },
    ];
    await queryRunner.manager.getRepository('category').save(categories);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM category`);
  }
}
