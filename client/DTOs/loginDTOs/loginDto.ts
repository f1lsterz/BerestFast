export interface LoginDto {
  password: string;
  phoneNumber: string;
  deviceName: string;
  os: string;
  appVersion: string;
  ipAddress?: string;
}
