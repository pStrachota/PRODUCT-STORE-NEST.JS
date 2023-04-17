import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/user.entity';

export class users1681543192764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO user (id, email, password, login, name, surname, role)
          values ('acde070d-8c4c-4f0d-9d8a-162843c10333', 'admin@mail.com', '$2b$11$jQYEBbGTN/Vtwm3sgQMvsunDd6mJaww4XvH10zgBYauQ2UJ2aPPJG', 'admin123', 'Adam', 'Brown', 'Admin')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).delete({});
  }
}
