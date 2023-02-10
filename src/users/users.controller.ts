import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Render,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get('test')
  // async test() {
  //   const id = '정은지';
  //   const name = '정은지';
  //   const password = '1234';
  //
  //   const userData: CreateUserDto = {
  //     id,
  //     name,
  //     password,
  //   };
  //
  //   return await this.usersService.create(userData);
  // }
}
