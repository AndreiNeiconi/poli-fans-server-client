import { Inject, Injectable, Query } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class FileUploadService {
    constructor(@Inject(PG_CONNECTION) private conn:any){}


    async handleFileUpload(file: Express.Multer.File,purpose){
        const qurry = `UPDATE media_files 
        SET 
            id = $1,
            original_name = $2,
            internal_name $3,
            file_path = $4,
            mime_type = $5,
            size_bytes = $6,
            created_at = $7
            `
        const values = [
            file.filename,
            file.originalname,
            file.filename,
            file.destination,
            file.mimetype,
            file.size,
            Date.now()
            
        ];
        const res = await this.conn.query(qurry,values)
            console.log(`Rows affected: ${res.rowCount}`);

        return {message: 'File uploaded successfully',filePath:file.path}
    }
}
