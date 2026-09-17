import { Inject, Injectable, Query } from '@nestjs/common';
import { PG_CONNECTION } from '../database/database.module';
import { MediaPurpose } from './dto/general.dto';

@Injectable()
export class FileUploadService {
    constructor(@Inject(PG_CONNECTION) private conn:any){}


    async handleFileUpload(file: Express.Multer.File,purpose: MediaPurpose,userID){
        const qurry = `INSERT INTO media_files 
        (original_name, internal_name, file_path,
    mime_type, size_bytes, uploaded_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())
            `
        const values = [
            file.originalname,
            file.filename,
            file.destination,
            file.mimetype,
            file.size,
            userID,
            
        ];
        console.log(userID)
        const res = await this.conn.query(qurry,values)
            console.log(`Rows affected: ${res.rowCount}`);

        return {message: 'File uploaded successfully',filePath:file.path,res}
    }
}
