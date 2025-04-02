import { create } from "zustand";
import { RegistrationDto } from "DTOs/loginDTOs/registrationDto";
import { Role } from "models/role";

export const RegistrationStorage = create<
  RegistrationDto & {
    setName: (name: string) => void;
    setPassword: (password: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setRole: (role: Role) => void;
    setDeviceName: (deviceName: string) => void;
    setOs: (os: string) => void;
    setAppVersion: (appVersion: string) => void;
    setIpAddress: (ipAddress: string) => void;
  }
>((set) => ({
  name: "",
  password: "",
  phoneNumber: "",
  role: "USER", 
  deviceName: "",
  os: "",
  appVersion: "",
  ipAddress: undefined,

  setName: (name) => set({ name }),
  setPassword: (password) => set({ password }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setRole: (role) => set({ role }),
  setDeviceName: (deviceName) => set({ deviceName }),
  setOs: (os) => set({ os }),
  setAppVersion: (appVersion) => set({ appVersion }),
  setIpAddress: (ipAddress) => set({ ipAddress }),
}));
