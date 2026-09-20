import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class ImagUrlSystemService {
    constructor(@Inject(PG_CONNECTION) private conn: any){}

    async getImg(mediaId: string) {
        const query = 'SELECT file_path,mime_type FROM media_files WHERE id = $1';
        const res = await this.conn.query(query, [mediaId]);
        if (!res.rows[0]) { 
            console.log("No image was found")
            throw new HttpException(
                'Not Found',
                HttpStatus.NOT_FOUND,
                
            );
            
        }
        return res.rows[0];
    }
}
