import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { ChatModule } from "./chat/chat.module";
import { PaymentModule } from "./payment/payment.module";
import config from "./config/config";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    OrderModule,
    ProductModule,
    ChatModule,
    PaymentModule,
    PrismaModule,
  ],
})
export class AppModule {}
