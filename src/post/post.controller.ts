import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create_text_only_post(@Req() req:any,@Body() post:CreatePostDto)
  {
    const  userId = req.user.sub;
  }
}
