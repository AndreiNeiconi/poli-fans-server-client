import { BadRequestException, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID, UUID } from 'crypto';
import { mkdirSync } from 'fs';
import { MediaPurpose } from './dto/general.dto';
import { MdediaTypesDto } from './dto/fileType.dto';



@Module({
  imports:[
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 *1024 // 5 megabytes
      },
      fileFilter:(req,file,cb)=> {
      const allowedMimeTypes:string[]= Object.values(MdediaTypesDto)
      if(allowedMimeTypes.includes(file.mimetype)){
      cb(null,true);
    }
    else{
      cb(new Error("Invalid file type. Only specific file are allowed"),false)
    }
      },
      storage: diskStorage({
        destination:(req,file,cb) => {
          var purpose:string = "null"
          if(req.body.purpose === MediaPurpose.COVER_IMAGE || req.body.purpose === MediaPurpose.POST_IMAGE || req.body.purpose === MediaPurpose.PROFILE_IMAGE ){
          purpose = req.body.purpose;
          }
          else{
            console.log("The porpose dose not mention proporly",req.body.purpose);
            throw new BadRequestException;
            
          }
            
          const path = `/home/neiconidotdev/uploads/${purpose}`;
          cb(null,path);
          },
          filename: (req,file,cb) => {
            
            const filename = `${Date.now()}-${randomUUID()}`;
            cb(null,filename)
          
          }
        
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {
  
}
