// store/useSecureStore.ts
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { saveToSecureStorage ,getFromSecureStorage,removeFromSecureStorage } from './secureStorage';

interface SecureState {
  username: string;
  token: string;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  clearStorage: () => void;
}

// Використовуємо функції з utils
const secureStorage: PersistStorage<SecureState> = {
  getItem: (name) => getFromSecureStorage<SecureState>(name),
  setItem: (name, value) => saveToSecureStorage(name, value),
  removeItem: (name) => removeFromSecureStorage(name),
};

export const useSecureStore = create<SecureState>()(
  persist(
    (set) => ({
      username: '',
      token: '',
      setUsername: (username) => set({ username }),
      setToken: (token) => set({ token }),
      clearStorage: () => set({ username: '', token: '' }),
    }),
    {
      name: 'secure-storage', // Ключ для SecureStore
      storage: secureStorage, // Використовуємо кастомне зберігання
    }
  )
);
