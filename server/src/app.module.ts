import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { ChatModule } from "./chat/chat.module";
import { PaymentModule } from "./payment/payment.module";
import config from "./config/config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "./prisma.module";
import { CacheModule } from "@nestjs/cache-manager";
import { createKeyv } from "@keyv/redis";
import { ParserModule } from "./parsers/parser.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>(
          "config.redis.host",
          "localhost"
        );
        const redisPort = configService.get<number>("config.redis.port", 6379);
        return {
          stores: [createKeyv(`redis://${redisHost}:${redisPort}`)],
          compression: true,
          /*  storeOptions: {
            auth_pass: 'your-redis-password', // Якщо потрібно
            tls: true,  // Якщо підключаєтесь через захищене з'єднання
          }, */
        };
      },
    }),
    AuthModule,
    UserModule,
    OrderModule,
    ProductModule,
    ChatModule,
    PaymentModule,
    PrismaModule,
    ParserModule,
  ],
})
export class AppModule {}
