import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from './role.enum';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    return await this.usersService.findOne(req.user.userId);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAll() {
    return await this.usersService.find();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
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
