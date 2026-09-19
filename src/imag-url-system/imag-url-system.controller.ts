import { Controller, Get, Param, Req } from '@nestjs/common';
import { ImagUrlSystemService } from './imag-url-system.service';

@Controller('imag-url-system')
export class ImagUrlSystemController {
  constructor(private readonly imagUrlSystemService: ImagUrlSystemService) {}
  @Get(':id')
  async get_imag(@Param('id') id:string){
    const mediaId =id

    return this.imagUrlSystemService.getImg(mediaId)
  }
}
