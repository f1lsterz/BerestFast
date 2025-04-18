import { Role } from "./role";

export type User = {
  id: number;
  name: string;
  phoneNumber: string;
  photoUrl?:string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};
