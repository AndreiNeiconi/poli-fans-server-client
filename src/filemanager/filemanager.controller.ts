import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilemanagerService } from './filemanager.service';
import { CreateFilemanagerDto } from './dto/create-filemanager.dto';
import { UpdateFilemanagerDto } from './dto/update-filemanager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('filemanager')
export class FilemanagerController {
  constructor(private readonly filemanagerService: FilemanagerService) {}

  @UseInterceptors(FileInterceptor('file', {
    // Aici se trec opțiunile de storage
    storage: diskStorage({
      destination: '/home/neiconidotdev/PoliFans_data', // Directorul de destinație
      filename: (req, file, cb) => {
        // Generare nume unic: timestamp + extensie originală
        const randomName = uuidv4();
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    // Opțional: Limite de mărime
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    },
  }))
  @Post()
  create(@UploadedFile() file: Express.Multer.File) {
    return this.filemanagerService.create(file);
  }

  @Get()
  findAll() {
    return this.filemanagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filemanagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilemanagerDto: UpdateFilemanagerDto) {
    return this.filemanagerService.update(+id, updateFilemanagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filemanagerService.remove(+id);
  }
}
