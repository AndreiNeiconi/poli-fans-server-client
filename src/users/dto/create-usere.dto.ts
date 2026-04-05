export class CreateUserDto {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string; // Plain text from the request, we hash it in the service
}