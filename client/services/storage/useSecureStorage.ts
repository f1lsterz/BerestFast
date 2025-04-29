// utils/userSecureStore.ts
import * as SecureStore from 'expo-secure-store';
import { User } from 'models/user';

const USER_KEY = 'user-data';

export interface StoredUserData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const saveUserData = async (data: StoredUserData) => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = async (): Promise<StoredUserData | null> => {
  try {
    const json = await SecureStore.getItemAsync(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const clearUserDataStorage = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
