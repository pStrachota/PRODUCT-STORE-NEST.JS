import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/user.entity';

export class users1681543192764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO user (email, password, login, name, surname, role)
          values ('admin@mail.com', '$2b$11$lUP2SF3lva71kN0OBmOwzuoAJ7FucvRODQoL49hggU/.1tb0wEy66', 'admin123', 'John', 'Doe', 'Admin')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).delete({});
  }
}
