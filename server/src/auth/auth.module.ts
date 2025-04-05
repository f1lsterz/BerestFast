import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import config from "../config/config";
import { JwtStrategy } from "../common/strategies/jwt.strategy";
import { TwilioModule } from "../twilio/twilio.module";

@Module({
  imports: [
    JwtModule.registerAsync(config.asProvider()),
    UserModule,
    TwilioModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
