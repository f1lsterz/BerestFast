import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config/config";

@Module({
  imports: [JwtModule.registerAsync(config.asProvider()), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
