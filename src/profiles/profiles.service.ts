import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class ProfilesService {
    constructor(@Inject(PG_CONNECTION) private conn: any) { }
    
    async getProfile(userId: number) {
        const query = 'SELECT * FROM user_profiles WHERE id = $1';
        const res = await this.conn.query(query, [userId]);
        if (!res.rows[0]) { 
            console.log("nothing found")
        }
        return res.rows[0];
    }
    async updateProfile(userId: number, data: any) {
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
        // DEBUG: Vezi dacă Postgres a modificat ceva
    console.log(`Rows affected: ${res.rowCount}`); 
    
    if (res.rowCount === 0) {
        console.warn(`Atenție: Niciun rând nu a fost găsit cu ID-ul ${userId}`);
    }
        return res.rows[0];
    }
}
