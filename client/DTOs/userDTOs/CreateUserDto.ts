export type Role = "USER" | "ADMIN" | "COURIER";

export interface CreateUserDto {
  name: string;
  password: string;
  phoneNumber: string;
  role: Role;
}
