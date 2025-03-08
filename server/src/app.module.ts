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
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { APP_INTERCEPTOR } from "@nestjs/core";

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
        const host = configService.get<string>("config.aws.elastiCache.host");
        const port = configService.get<number>("config.aws.elastiCache.port");

        console.log("Redis Host:", host);
        console.log("Redis Port:", port);

        let store;
        try {
          store = await redisStore({
            ttl: 3600,
            socket: {
              host,
              port,
            },
          });

          // Перевіряємо, чи підключення до Redis було успішним
          await store.set("testKey", "testValue");
          const value = await store.get("testKey");
          console.log("Test value from Redis:", value);
        } catch (error) {
          console.error("Error connecting to Redis:", error);
        }

        // Повертаємо store лише в разі успішного підключення
        return { store };
      },
    }),
    AuthModule,
    UserModule,
    OrderModule,
    ProductModule,
    ChatModule,
    PaymentModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
