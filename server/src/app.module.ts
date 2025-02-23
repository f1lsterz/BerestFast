import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { ChatModule } from "./chat/chat.module";
import { NotificationModule } from "./notification/notification.module";
import { PaymentModule } from "./payment/payment.module";
import config from "./config/config";
import { ConfigModule } from "@nestjs/config";

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
    NotificationModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
