import { useUserStore } from "services/storage/user-storage";

export function decodeAccessToken(accessToken: string): any {
  const base64Url = accessToken.split(".")[1];
  const decodedPayload = base64UrlDecoder(base64Url);
  return JSON.parse(decodedPayload);
}

function base64UrlDecoder(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");

  const pad = str.length % 4;
  if (pad) {
    str += "=".repeat(4 - pad);
  }

  if (typeof window !== "undefined") {
    return atob(str);
  }

  return Buffer.from(str, "base64").toString("utf-8");
}
