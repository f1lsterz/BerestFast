// store/userStore.ts
import { create } from "zustand";
import { User } from "models/user";
import {
  getUserData,
  saveUserData,
  clearUserDataStorage,
} from "../useSecureStorage";

interface StoredUserData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface UserStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUserData: (user: User, accessToken: string, refreshToken: string) => void;
  clearUserData: () => void;
  loadUserDataFromStorage: () => Promise<StoredUserData | null>; 
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setUserData: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken });
    saveUserData({ user, accessToken, refreshToken });
  },

  clearUserData: () => {
    set({ user: null, accessToken: null, refreshToken: null });
    clearUserDataStorage();
  },

  loadUserDataFromStorage: async () => {
    const stored = await getUserData();

    console.log("Stored user:", JSON.stringify(stored));

    if (stored) {
      set({
        user: stored.user,
        accessToken: stored.accessToken,
        refreshToken: stored.refreshToken,
      });
    }

    return stored;
  },
}));
