import { Module } from "@nestjs/common";
import { AuthService } from "@auth/auth.service";
import { AuthController } from "@auth/auth.controller";
import { UserModule } from "@user/user.module";
import { JwtModule } from "@nestjs/jwt";
import config from "@config/config";
import { JwtStrategy } from "@strategies/jwt.strategy";

@Module({
  imports: [JwtModule.registerAsync(config.asProvider()), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
