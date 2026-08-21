import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID, UUID } from 'crypto';



@Module({
  imports:[
    MulterModule.register({
      storage: diskStorage({
        
        destination:(req,file,cb) => {
          const purpose = req.body.purpose;
          
         const path = `/home/neiconidotdev/uploads/${purpose}`;
         cb(null,path);
        },
        filename: (req,file,cb) => {
          const uuid = randomUUID;
          
          const filename = `${uuid}${Date.now()}-${file.originalname}`;
          cb(null,filename)
        
        }
        
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
