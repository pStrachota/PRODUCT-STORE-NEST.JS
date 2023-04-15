import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  surname: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string;

  @IsOptional()
  @IsStrongPassword({
    minSymbols: 1,
    minNumbers: 1,
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
