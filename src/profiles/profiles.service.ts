import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class ProfilesService {
    constructor(@Inject(PG_CONNECTION) private conn: any) { }
    
    async getProfile(userId: number) {
        const query = 'SELECT * FROM user_display_profiles WHERE id = $1';
        const res = await this.conn.query(query, [userId]);
        return res.rows[0];
    }
}
