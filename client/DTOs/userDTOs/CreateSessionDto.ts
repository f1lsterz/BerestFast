export interface CreateSessionDto {
  refreshToken: string;
  deviceName: string;
  os: string;
  appVersion: string;
  ipAddress?: string;
}
