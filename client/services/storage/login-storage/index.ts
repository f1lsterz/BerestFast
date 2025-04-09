import { create } from "zustand";
import { LoginDto } from "DTOs/authDTOs/loginDto";

export const LoginStorage = create<
  LoginDto & {
    setPasswordLogin: (password: string) => void;
    setPhoneNumberLogin: (phoneNumber: string) => void;
    setDeviceNameLogin: (deviceName: string) => void;
    setOsLogin: (os: string) => void;
    setAppVersionLogin: (appVersion: string) => void;
    setIpAddressLogin: (ipAddress?: string) => void;
  }
>((set) => ({
  password: "",
  phoneNumber: "",
  deviceName: "",
  os: "",
  appVersion: "",
  ipAddress: undefined,

  setPasswordLogin: (password) => set({ password }),
  setPhoneNumberLogin: (phoneNumber) => set({ phoneNumber }),
  setDeviceNameLogin: (deviceName) => set({ deviceName }),
  setOsLogin: (os) => set({ os }),
  setAppVersionLogin: (appVersion) => set({ appVersion }),
  setIpAddressLogin: (ipAddress) => set({ ipAddress }),
}));
