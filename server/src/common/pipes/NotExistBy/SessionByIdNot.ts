import { PrismaService } from "src/prisma.service";
import { EntityByIdNotPipe } from "./EntityByIdNot";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionByIdNotPipe extends EntityByIdNotPipe {
  constructor(prisma: PrismaService) {
    super(prisma, "session");
  }
}
