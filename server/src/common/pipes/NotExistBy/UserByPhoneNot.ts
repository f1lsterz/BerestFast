import { Injectable, PipeTransform } from "@nestjs/common";
import { ApiError } from "@errors/apiError";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserByPhoneNotPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(phoneNumber: string) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      throw ApiError.NotFound(
        `User with phone number ${phoneNumber} not found`
      );
    }

    return phoneNumber;
  }
}
