import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class ProfilesService {
    constructor(@Inject(PG_CONNECTION) private conn: any) { }
    
       async getProfile(userId: number) {
        const query = 'SELECT * FROM user_display_profiles WHERE id = $1';
        const res = await this.conn.query(query, [userId]);
        if (!res.rows[0]) { 
            console.log("nothing found")
        }
        return res.rows[0];
    }
    async updateProfile(userId: number, data: any) {
        // Only fixed, approved columns can be changed. Empty values preserve existing data.
        const columns = ['headline', 'bio', 'date_of_birth', 'profile_picture_id', 'cover_photo_id', 'skills'];
        const assignments: string[] = [];
        const values: unknown[] = [];
        for (const column of columns) {
            let value = data?.[column];
            if (value === undefined || value === null) continue;
            if (typeof value === 'string') {
                value = value.trim();
                if (!value) continue;
            }
            if (column === 'skills') {
                const skills = typeof value === 'string' ? value.split(',') : value;
                if (!Array.isArray(skills) || skills.some(item => typeof item !== 'string')) {
                    throw new BadRequestException('Skills must be text or an array of strings');
                }
                value = skills.map(item => item.trim()).filter(Boolean);
                if (!value.length) continue;
            } else if (typeof value !== 'string') {
                throw new BadRequestException('Profile values must be strings');
            }
            if (column === 'profile_picture_id' || column === 'cover_photo_id') {
                if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
                    throw new BadRequestException('Invalid image ID');
                }
                const image = await this.conn.query(
                    'SELECT id FROM media_files WHERE id = $1 AND uploaded_by = $2 AND mime_type IN ($3, $4)',
                    [value, userId, 'image/jpeg', 'image/png']
                );
                if (!image.rows.length) throw new BadRequestException('Image is not an available upload for this user');
            }
            values.push(value);
            assignments.push(column + ' = $' + values.length);
        }
        if (!assignments.length) return this.getProfile(userId);
        values.push(userId);
        const query = 'UPDATE user_profiles SET ' + assignments.join(', ') +
            ', updated_at = NOW() WHERE id = $' + values.length + ' RETURNING *';
        const result = await this.conn.query(query, values);
        if (!result.rows.length) throw new NotFoundException('Profile not found');
        return result.rows[0];
    }
}