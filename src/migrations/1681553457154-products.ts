import { MigrationInterface, QueryRunner } from 'typeorm';
import { Product } from '../products/product.entity';

export class products1681553457154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into product (name, description, price, categoryId) 
values ('Creatine lemon 120g', 'Creatine is a natural substance found in the body. It is produced in the liver, kidneys and pancreas. It is also found in red meat and fish. Creatine is stored in the muscles in the form of phosphocreatine.', 20, 1),
 ('Nike Air Max 270', 'Nike Air Max 270 is a new silhouette from Nike. It is a combination of the Air Max 180 and Air Max 93. The shoe features a full-length Air unit, a mesh upper, and a synthetic heel counter.', 200, 2),
('iPhone 6s', 'iPhone 6s is a smartphone designed, developed, and marketed by Apple Inc. It is the tenth generation of the iPhone.', 500, 3),
('T-shirt', 'A T-shirt is a style of unisex fabric shirt named after the T shape of its body and sleeves.', 20, 2),
('Bread', 'Bread is a staple food prepared from a dough of flour and water, usually by baking.', 2, 5),
('hammer', 'A hammer is a tool that delivers a blow to an object.', 10, 4),
('Snickers', 'Snickers is a brand name chocolate bar made by the American company Mars, Incorporated, consisting of nougat topped with caramel and peanuts that has been enrobed in milk chocolate.', 1, 5),
('Samsung Galaxy S10', 'Samsung Galaxy S10 is a line of Android-based smartphones manufactured, released and marketed by Samsung Electronics as part of the Samsung Galaxy S series.', 600, 3),
('Music CD', 'A compact disc (CD) is a digital optical disc data storage format.', 10, 4),
('Bicycle', 'A bicycle, also called a bike or cycle, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.', 200, 4),
('Apple', 'An apple is a sweet, edible fruit produced by an apple tree (Malus pumila).', 1, 5),
('The Lord of the Rings', 'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.', 20, 6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Product).delete({});
  }
}
