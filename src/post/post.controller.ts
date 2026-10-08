import { Body, Controller, Get, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateMediaPostDto } from './dto/create-media-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { FileUploadService } from '../file-upload/file-upload.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create_text_only_post(@Req() req:any,@Body() post:CreatePostDto)
  {
    const  userId = req.user.sub;
    return this.postService.create_post(post,userId)
  }
  @Post('/media-post')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create_media_post_(@Req() req:any,@UploadedFile() file: Express.Multer.File,@Body() post:CreateMediaPostDto){
    const userId =  req.user.sub;

    return this.postService.create_media_post(post,userId)


  }
  @Get()
  @UseGuards(AuthGuard)
  async getPost(@Req() req:any){
    const userId =  req.user.sub;

    return this.postService.getPost(userId);
  }
  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(@Req() req:any){
    const userId =  req.user.sub;

    return this.postService.getFeed(userId);

  }
}
