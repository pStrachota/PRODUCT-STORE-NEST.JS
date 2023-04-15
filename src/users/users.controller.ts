import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  async getUser(@Request() req) {
    return await this.usersService.findOne(req.user.userId);
  }

  @Get()
  async getAll() {
    return await this.usersService.find();
  }

  @Patch()
  async updateUser(@Request() req, @Body() user: UpdateUserDto) {
    try {
      return await this.usersService.updateUser(user, req.user.userId);
    } catch (e) {
      const err = e as Error;
      this.usersService.logger.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
