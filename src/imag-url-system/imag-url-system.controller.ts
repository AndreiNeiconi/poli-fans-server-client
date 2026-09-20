import { Controller, Get, Param, Req, StreamableFile } from '@nestjs/common';
import { ImagUrlSystemService } from './imag-url-system.service';
import { createReadStream } from 'fs';

@Controller('imag-url-system')
export class ImagUrlSystemController {
  constructor(private readonly imagUrlSystemService: ImagUrlSystemService) {}
  @Get(':id')
  async get_imag(@Param('id') id:string) :Promise<StreamableFile>{
 const image = await this.imagUrlSystemService.getImg(id);
  const stream = createReadStream(image.file_path);

  return new StreamableFile(stream, {
    type: image.mime_type,
    disposition: 'inline',
  });
  }
}
