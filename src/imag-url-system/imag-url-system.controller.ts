import { Controller, Get, Req } from '@nestjs/common';
import { ImagUrlSystemService } from './imag-url-system.service';

@Controller('imag-url-system')
export class ImagUrlSystemController {
  constructor(private readonly imagUrlSystemService: ImagUrlSystemService) {}
  @Get()
  async get_imag(@Req() req:any){
    const mediaId =req

    return this.imagUrlSystemService.getImg(mediaId)
  }
}
