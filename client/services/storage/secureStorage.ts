// utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import { StorageValue } from 'zustand/middleware';

// Збереження значення
export const saveToSecureStorage = async (key: string, value: unknown) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getFromSecureStorage = async <T>(key: string): Promise<StorageValue<T> | null> => {
  const value = await SecureStore.getItemAsync(key);
  return value ? (JSON.parse(value) as StorageValue<T>) : null;
};

export const removeFromSecureStorage = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
