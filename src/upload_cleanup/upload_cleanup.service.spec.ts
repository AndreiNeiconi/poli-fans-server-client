import { Test, TestingModule } from '@nestjs/testing';
import { UploadCleanupService } from './upload_cleanup.service';

describe('UploadCleanupService', () => {
  let service: UploadCleanupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadCleanupService],
    }).compile();

    service = module.get<UploadCleanupService>(UploadCleanupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
