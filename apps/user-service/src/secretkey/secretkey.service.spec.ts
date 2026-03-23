import { Test, TestingModule } from '@nestjs/testing';
import { SecretkeyService } from './secretkey.service';

describe('SecretkeyService', () => {
  let service: SecretkeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretkeyService],
    }).compile();

    service = module.get<SecretkeyService>(SecretkeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
