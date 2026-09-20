import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Query } from '@nestjs/common';
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
    async profile_pic_id(id:string,profi_pic_id:string){
        const query = 'UPDATE user_profiles SET profile_picture_id = $1 WHERE id= $2 RETURNING profile_picture_id';
        const res = await this.conn.query(query,[profi_pic_id,id]);
        if (res.rows.length === 0 ) { 
            console.log("No matching id")
            throw new HttpException(
                'Not Found',
                HttpStatus.NOT_FOUND,
                
            );
            
        }
        
    }
}
