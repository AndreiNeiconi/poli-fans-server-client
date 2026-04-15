import { IsEmail, IsOptional, IsString ,MinLength, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name?: string;
  @IsString()
  @IsNotEmpty()
  last_name?: string;
  @IsString()
  @IsNotEmpty()
  username?: string;
  @IsEmail()
  @IsNotEmpty()
  email?: string;
  @IsString()
  @MinLength(8)
  password_hash?: string; // Plain text from the request, we hash it in the service
}