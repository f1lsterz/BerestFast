import { Injectable, PipeTransform } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { ApiError } from "../../../common/errors/apiError";
import { CreateUserDto } from "../../../user/dto/create.user.dto";

export interface HasPhone {
  phoneNumber?: string;
}

@Injectable()
export class UniquePhoneNumberPipe
  implements PipeTransform<HasPhone, Promise<HasPhone>>
{
  constructor(private readonly prisma: PrismaService) {}

  /* async transform(createUserDto: CreateUserDto) {
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
} */

  async transform(value: HasPhone): Promise<HasPhone> {
    const phone = value.phoneNumber;
    if (phone) {
      const exists = await this.prisma.user.findUnique({
        where: { phoneNumber: phone },
      });
      if (exists) {
        throw ApiError.BadRequest("Phone number is already taken.");
      }
    }
    return value;
  }
}
