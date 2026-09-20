import { PG_CONNECTION } from './../database/database.module';
import { Inject, Injectable, OnModuleInit, Query } from '@nestjs/common';

@Injectable()
export class UploadCleanupService implements OnModuleInit {
    constructor(@Inject(PG_CONNECTION) private conn: any ){}
    
    async onModuleInit(): Promise<void> {
  console.log('Starting upload candidate scan');

  try {
    await this.findCleanupCandidates();
  } catch (error) {
    console.error('Upload candidate scan failed:', error);
  }
}

    clenup_candiate:string[] = [];
    async check_id_apperence(id:string){
        const qury = `SELECT profile_picture_id,cover_photo_id FROM user_profiles WHERE profile_picture_id = $1 OR cover_photo_id = $1`;
        const res = await this.conn.query(qury,[id])
        if(res.rows.length < 1 ){
            this.clenup_candiate.push(id);
            console.log(this.clenup_candiate)
        }

    }
    async findCleanupCandidates(): Promise<string[]> {
  this.clenup_candiate = [];

  const query = `
    SELECT id
    FROM media_files
    WHERE created_at < NOW() - INTERVAL '1 day'
      AND mime_type IN ('image/jpeg', 'image/png')
  `;

  const res = await this.conn.query(query);

  for (const image of res.rows) {
    await this.check_id_apperence(image.id);
  }

  console.log('Cleanup candidates:', this.clenup_candiate);
  return [...this.clenup_candiate];
}


}
