import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { FilemanagerService } from './filemanager.service';
import { CreateFilemanagerDto } from './dto/create-filemanager.dto';
import { UpdateFilemanagerDto } from './dto/update-filemanager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { diskStorage } from 'multer';
import { extname,join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { error } from 'console';
import * as fs from 'fs';
import { AuthGuard } from '../auth/auth.guard';


@Controller('filemanager')
export class FilemanagerController {
  constructor(private readonly filemanagerService: FilemanagerService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      // Funcția destination determină dinamic unde salvăm fișierul
      destination: (req, file, cb) => {
        const rootPath = '/home/neiconidotdev/PoliFans_data';
        
        // Luăm folderul din query parameter (ex: ?folder=users)
        // Dacă nu e specificat, folosim 'Shared' ca fallback
        const folderHint = (req.query.folder as string) || 'Shared';
        
        // Mapăm indiciul către structura ta de foldere
        let subFolder = 'Shared/media';
        if (folderHint.toLowerCase() === 'users') subFolder = 'Users/media';
        if (folderHint.toLowerCase() === 'channels') subFolder = 'Channels/media';

        const finalPath = join(rootPath, subFolder);

        // Verificăm dacă folderul există, dacă nu, îl creăm recursiv
        if (!fs.existsSync(finalPath)) {
          fs.mkdirSync(finalPath, { recursive: true });
        }

        cb(null, finalPath);
      },
      filename: (req, file, cb) => {
        // Generăm un nume unic păstrând extensia originală
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 5 }, // Limită 5MB
  }))
  async create(@UploadedFile() file: Express.Multer.File,@Req() req:any) {
    if (!file) {
      throw new BadRequestException('Fișierul lipsește din cerere!');
    }

    // Aici trimitem metadatele către serviciu pentru a le salva în PostgreSQL
    const userId = req.user.sub
    return this.filemanagerService.create(file,userId);
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
