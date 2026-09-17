import { BadRequestException, Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { MediaPurpose } from './dto/general.dto';
import { UsersService } from '../users/users.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
@UseGuards(AuthGuard)
  async uploadFile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('purpose') purpose:MediaPurpose,
  ) {
    if(!file){
      throw new BadRequestException('no file uploaded');

    }

    //validate file type
    const allowedMimeTypes = ['image/jpeg','image/png','application/pdf'];
    const userId = req.user.id;

    if(!allowedMimeTypes.includes(file.mimetype)){
      throw new BadRequestException('invalid file type');
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize){
      throw new BadRequestException('File is too large!!!')
    }

    return this.fileUploadService.handleFileUpload(file,purpose,userId);
  }
}
