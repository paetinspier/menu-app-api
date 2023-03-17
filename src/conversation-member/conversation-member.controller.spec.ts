import { Test, TestingModule } from '@nestjs/testing';
import { ConversationMemberController } from './conversation-member.controller';

describe('ConversationMemberController', () => {
  let controller: ConversationMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationMemberController],
    }).compile();

    controller = module.get<ConversationMemberController>(ConversationMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
