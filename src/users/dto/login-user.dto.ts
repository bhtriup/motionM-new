import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userPw: string;
}
