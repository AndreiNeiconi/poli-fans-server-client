import { UUID } from 'crypto';
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Query } from '@nestjs/common';
import { inspect } from 'util';
import { PG_CONNECTION } from '../database/database.module';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateMediaPostDto } from './dto/create-media-post.dto';

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
    async create_media_post(post:CreateMediaPostDto,id:string){
        const query = `INSERT INTO posts (create_at,title,content,document_id,id_user_post) VALUES (NOW(), $1, $2, $3, $4 )
    RETURNING id_post`;
    const values = [
            post.title,
            post.content,
            post.document_id,
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

    async getPost(id:string){
        const query = `SELECT create_at,title,content,id_post FROM posts WHERE id_user_post = $1 ORDER BY create_at DESC, id_post DESC`;
        const res = await this.conn.query(query,[id])

        return res.rows


    }
    async getFeed(id:string){
    const query = `SELECT
    p.id_post,
    p.title,
    p.content,
    p.document_id,
    p.create_at,
    u.username,
    u_p.profile_picture_id,
    m_p.mime_type,
    m_p.original_name
FROM posts AS p
JOIN user_table AS u
    ON p.id_user_post = u.id
LEFT JOIN user_profiles AS u_p
    ON u.id = u_p.id
LEFT JOIN media_files AS m_p
    ON p.document_id = m_p.id
ORDER BY p.create_at DESC, p.id_post DESC;`;
        const res = await this.conn.query(query);

        return res.rows;
    }
    async deletePost(id_user,id_post){
        const query = `
            UPDATE posts
SET deleted_at = NOW()
WHERE id = $1
  AND user_id = $2
RETURNING id;
        `
        const res = await this.conn.query(query,[id_post,id_user]);
        return res.row;
    }
    

}
