import { Test, TestingModule } from "@nestjs/testing";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { AWSService } from "src/aws/aws.service";
import { Cache } from "cache-manager";
import { mockDeep, MockProxy } from "jest-mock-extended";
import { PrismaService } from "src/prisma.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

describe("ChatGateway", () => {
  let gateway: ChatGateway;
  let chatService: MockProxy<ChatService>;
  let awsService: MockProxy<AWSService>;
  let prisma: MockProxy<PrismaService>;
  let cacheManager: MockProxy<Cache>;

  beforeEach(async () => {
    chatService = mockDeep<ChatService>();
    awsService = mockDeep<AWSService>();
    prisma = mockDeep<PrismaService>();
    cacheManager = mockDeep<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: ChatService,
          useValue: chatService,
        },
        {
          provide: AWSService,
          useValue: awsService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
