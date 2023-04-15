import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  public readonly logger = new Logger('UsersService');

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByLogin(login: string): Promise<User | undefined> {
    return await this.repo.findOneBy({ login });
  }

  async findOne(id: string): Promise<Partial<User> | undefined> {
    const { password, ...user } = await this.repo.findOneBy({
      id,
    });
    return user;
  }

  async find(): Promise<Partial<User>[] | []> {
    return (await this.repo.find()).map((user) => {
      const { password, ...data } = user;
      return data;
    });
  }

  async createUser(user: CreateUserDto) {
    user.password = await hash(user.password, 11);
    const data = this.repo.create(user);
    await this.repo.save(data);
  }

  async updateUser(user: UpdateUserDto, userId: string) {
    Object.keys(user).forEach((key) => {
      if (!user[key]) {
        delete user[key];
      }
    });
    const dbUser = {
      ...(await this.repo.findOneBy({
        id: userId,
      })),
      ...user,
    };
    if (user.password) {
      dbUser.password = await hash(user.password, 11);
    }
    const { password, ...updatedUser } = await this.repo.save(dbUser);
    return updatedUser;
  }
}
