import { Test, TestingModule } from '@nestjs/testing';
import { SecretkeyController } from './secretkey.controller';
import { SecretkeyService } from './secretkey.service';

describe('SecretkeyController', () => {
  let controller: SecretkeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretkeyController],
      providers: [SecretkeyService],
    }).compile();

    controller = module.get<SecretkeyController>(SecretkeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
