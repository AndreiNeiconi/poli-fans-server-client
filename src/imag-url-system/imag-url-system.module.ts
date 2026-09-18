import { Module } from '@nestjs/common';
import { ImagUrlSystemService } from './imag-url-system.service';
import { ImagUrlSystemController } from './imag-url-system.controller';

@Module({
  controllers: [ImagUrlSystemController],
  providers: [ImagUrlSystemService],
})
export class ImagUrlSystemModule {}
