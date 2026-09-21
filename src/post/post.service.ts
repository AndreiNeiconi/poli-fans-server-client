import { UUID } from 'crypto';
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { inspect } from 'util';
import { PG_CONNECTION } from '../database/database.module';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(@Inject(PG_CONNECTION) private conn:any){}
    async create_post(post:CreatePostDto,id:string){
        const query = `INSERT INTO posts (create_at,title,content,id_user_post) VALUES (NOW(), $1, $2, $3 )
    RETURNING id_post`;
    const values = [
            post.title,
            post.content,
            id
            
        ];
        const res = await this.conn.query(query,values)
        if(!res.rows[0]){
        
            throw new InternalServerErrorException('Post could not be created');

        }
        return {
            id_post: res.rows[0].id_post,
            message: 'Post created successfully',
};
        
        
    }

}
