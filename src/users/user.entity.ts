import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from "./role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column()
  name: string;

  @Column()
  surname: string;
}
