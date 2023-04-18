import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { QueryFailedError } from 'typeorm';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Roles } from './roles/roles.decorator';
import { Role } from '../users/role.enum';
import { RolesGuard } from './roles/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    const jwt = {
      ...(await this.authService.login(req.user)),
      method: 'Bearer',
    };
    this.authService.logInfo(`New user ${req.user.login} log in to the system`);
    return jwt;
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    try {
      await this.authService.registrationUser(user);
      this.authService.logInfo(`New user ${user.login} was created`);
      return { message: 'User created successfully' };
    } catch (e) {
      const err = e as Error;
      this.authService.logError(err.message);
      if (err instanceof QueryFailedError) {
        throw new HttpException('login already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile/admin')
  getProfileAdmin(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @Get('profile/user')
  getProfileUser(@Request() req) {
    return req.user;
  }
}
