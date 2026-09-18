import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class ImagUrlSystemService {
    constructor(@Inject(PG_CONNECTION) private conn: any){}

    async getImg(mediaId: number) {
        const query = 'SELECT file_path FROM media_files WHERE id = $1';
        const res = await this.conn.query(query, [mediaId]);
        if (!res.rows[0]) { 
            console.log("nothing found")
        }
        return res.rows[0];
    }
}
