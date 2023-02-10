import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { validate } from 'class-validator';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    const { id, name, password } = dto;

    const qb = await this.userRepository
      .createQueryBuilder('user')
      .where('user.USER_ID = :id', { id });

    const user = await qb.getOne();

    if (user) {
      const errors = { id: '이미 사용중인 아이디입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new User();
    newUser.userId = id;
    newUser.userNm = name;
    newUser.userPw = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { userid: '가입 시 오류가 발생하였습니다.' };
      throw new HttpException(
        { message: 'Validation failed.', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.userRepository.save(newUser);
    }
  }

  async findOne(loginUserDto: LoginUserDto): Promise<User> {
    const { userId, userPw } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    if (!user) {
      return null;
    }

    if (bcrypt.compareSync(userPw, user.userPw)) {
      return user;
    }

    return null;
  }

  public async generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const payload = {
      idx: user.idx,
      id: user.userId,
      name: user.userNm,
      exp: exp.getTime() / 1000,
    };

    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }
}
