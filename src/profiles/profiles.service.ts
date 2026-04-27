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
    async updateProfile(userId: number, data: any) {
        // 1. Write the SQL UPDATE statement with parameterized inputs ($1, $2, etc.)
        // The "RETURNING *" at the end is a brilliant PostgreSQL trick that immediately 
        // hands you back the newly saved row so you don't have to run a SELECT query afterward!
        const query = `
            UPDATE user_profiles 
            SET 
                headline = $1, 
                bio = $2, 
                date_of_birth = $3,
                profile_picture_url = $4, 
                cover_photo_url = $5, 
                skills = $6, 
                updated_at = $7
            WHERE id = $8
            RETURNING *;
        `;

        // 2. Map the Angular data to the $ variables
        const values = [
            data.headline, 
            data.bio, 
            data.date_of_birth,
            data.profile_picture_url, 
            data.cover_photo_url, 
            data.skills, 
            data.updated_at, 
            userId // This is $8 in the WHERE clause
        ];

        // 3. Execute the query
        const res = await this.conn.query(query, values);
        return res.rows[0];
    }
}
