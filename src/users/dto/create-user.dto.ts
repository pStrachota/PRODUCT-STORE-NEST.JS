import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  login: string;

  @IsString()
  @MinLength(2)
  @MaxLength(32)
  surname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string;

  @IsStrongPassword({
    minSymbols: 1,
    minNumbers: 1,
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;

  @IsEmail()
  email: string;
}
