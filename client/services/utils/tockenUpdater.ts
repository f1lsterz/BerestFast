import { useUserStore } from "services/storage/user-storage";
import { decodeAccessToken } from "./AuthHeader";
import { refreshTokenFunc } from "./refreshTockenFunc";

function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeAccessToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (e) {
    console.error("Invalid token", e);
    return true;
  }
}

export const getValidAccessToken = async (): Promise<string | null> => {
  const { accessToken } = useUserStore.getState();

  if (!accessToken || isTokenExpired(accessToken)) {
    console.log("Access token expired, trying to refresh...");
    await refreshTokenFunc();
  }

  return useUserStore.getState().accessToken || null;
};
