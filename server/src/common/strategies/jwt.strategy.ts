import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "@config/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.secret,
    });
  }

  async validate(payload: any) {
    console.log("fdsfsd");
    return {
      userId: payload.sub,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
    };
  }
}
