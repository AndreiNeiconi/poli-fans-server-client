import { Inject, Injectable } from '@nestjs/common';
import { CreateFilemanagerDto } from './dto/create-filemanager.dto';
import { UpdateFilemanagerDto } from './dto/update-filemanager.dto';
import { PG_CONNECTION } from '../database/database.module';

@Injectable()
export class FilemanagerService {
  constructor(@Inject(PG_CONNECTION) private conn: any){}
  async create(file: Express.Multer.File) {
    const qurry = `
    INSERT INTO media_files (original_name, internal_name, file_path, mime_type, size_bytes, uploaded_by)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const values = [
    file.originalname,
    file.filename,
    file.destination,
    file.mimetype,
    file.size,
    null // Momentan punem null pentru uploaded_by până legăm Auth-ul
  ];
    const res = await this.conn.query(qurry, values)
    
    return res.rows[0];
  }

  findAll() {
    return `This action returns all filemanager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filemanager`;
  }

  update(id: number, updateFilemanagerDto: UpdateFilemanagerDto) {
    return `This action updates a #${id} filemanager`;
  }

  remove(id: number) {
    return `This action removes a #${id} filemanager`;
  }
}
