import { Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ApiError } from "src/common/errors/apiError";

@Injectable()
export class UniquePhoneNumberPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(phoneNumber: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      throw ApiError.BadRequest("Phone number is already taken.");
    }

    return phoneNumber;
  }
}
