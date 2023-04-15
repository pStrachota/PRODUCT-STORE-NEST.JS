import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from './dto/UserTokenDto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userId: user.id, sub: user.role } as UserTokenDto;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private readonly logger = new Logger('AppService');

  logError(msg: string) {
    this.logger.error(msg);
  }

  logInfo(msg: string) {
    this.logger.log(msg);
  }

  async registrationUser(user: CreateUserDto) {
    await this.usersService.createUser(user);
  }
}
