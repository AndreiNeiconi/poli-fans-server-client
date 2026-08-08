import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException('no file uploaded');

    }

    //validate file type
    const allowedMimeTypes = ['image/jpeg','image/png','application/pdf'];
    if(!allowedMimeTypes.includes(file.mimetype)){
      throw new BadRequestException('invalid file type');
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize){
      throw new BadRequestException('File is too large!!!')
    }

    return this.fileUploadService.handleFileUpload(file);
  }
}
