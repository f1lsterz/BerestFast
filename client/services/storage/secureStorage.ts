import * as SecureStore from 'expo-secure-store';

export const saveToSecureStorage = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getFromSecureStorage = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export const removeFromSecureStorage = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
