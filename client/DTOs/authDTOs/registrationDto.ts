import { Role } from "models/role";

export interface RegistrationDto {
  name: string;
  password: string;
  phoneNumber: string;
  role: Role;
  deviceName: string;
  os: string;
  appVersion: string;
  ipAddress?: string;
}
