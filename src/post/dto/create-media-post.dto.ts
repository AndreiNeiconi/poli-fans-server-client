import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaPostDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value
  )
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value
  )
  @IsString()
  @IsNotEmpty()
  content!: string;
  @Transform(({value}) => 
    typeof value === 'string' ? value.trim() : value
  )
  @IsString()
  document_id!:string;
  
}