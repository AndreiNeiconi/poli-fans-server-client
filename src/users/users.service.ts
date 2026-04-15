import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-usere.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async create(userData: CreateUserDto) {
    const { first_name, last_name, username, email, password_hash } = userData;

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_hash, salt);

    try {
      const query = `
        INSERT INTO user_table (first_name, last_name, username, email, password_hash) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, first_name, last_name, username, email, created_at
      `;
      
      const values = [first_name, last_name, username, email, hash];
      const res = await this.conn.query(query, values);
      
      return res.rows[0];
    } catch (err: any) {
      // Postgres error 23505 = Unique Violation (username or email taken)
      if (err.code === '23505') {
        throw new ConflictException('Username or Email already registered');
      }
      throw err;
    }
    }
    async findOne(identifier: string) {
  // We check if the typed string matches the username OR the email
  const query = 'SELECT * FROM user_table WHERE username = $1 OR email = $1';
  const res = await this.conn.query(query, [identifier]);
  return res.rows[0];
}
}