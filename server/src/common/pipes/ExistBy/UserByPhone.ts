import { Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ApiError } from "src/common/errors/apiError";
import { CreateUserDto } from "src/user/dto/create.user.dto";

@Injectable()
export class UniquePhoneNumberPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(createUserDto: CreateUserDto) {
    const { phoneNumber } = createUserDto;

    if (!phoneNumber) return createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      throw ApiError.BadRequest("Phone number is already taken.");
    }

    return createUserDto;
  }
}
