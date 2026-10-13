import { BadRequestException, Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { MediaPurpose } from './dto/general.dto';
import { UsersService } from '../users/users.service';
import { MdediaTypesDto } from './dto/fileType.dto';
import { MediaType } from 'express';

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
   
    const userId = req.user.sub;


    return this.fileUploadService.handleFileUpload(file,purpose,userId);
  }
}
