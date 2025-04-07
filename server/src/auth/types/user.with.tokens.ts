import { ApiProperty } from "@nestjs/swagger";
import { AuthTokens } from "../types/auth.tokens";
import { User } from "../../user/types/user";

export class UserWithTokens {
  @ApiProperty({ type: () => User, description: "Інформація про користувача" })
  user: User;

  @ApiProperty({ type: () => AuthTokens, description: "JWT токени" })
  tokens: AuthTokens;
}
