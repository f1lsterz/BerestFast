import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password?: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @Matches(/^\+380\d{9}$/, { message: "Phone number is not valid" })
  phoneNumber?: string;
}
