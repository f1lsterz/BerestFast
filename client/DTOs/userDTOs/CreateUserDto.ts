import { Role } from "models/role";

export interface CreateUserDto {
  name: string;
  password: string;
  phoneNumber: string;
  role: Role;
}
