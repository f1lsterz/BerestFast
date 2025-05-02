import { useUserStore } from "services/storage/user-storage";
import authService from "services/fetches/AuthServise";
import { RefreshTokenDto } from "DTOs/authDTOs/refreshTokenDto";

export const refreshTokenFunc = async () => {
  const { user, refreshToken, setUserData } = useUserStore();

  try {
    if (!user?.id || !refreshToken) {
      console.log("User ID or refresh token missing");
      return;
    }

    const ref: RefreshTokenDto = {
      userId: user.id,
      refreshToken: refreshToken,
    };

    const response = await authService.refreshTokenMeth(ref);

    if (response.status === 200 && response.data) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data as {
          accessToken: string;
          refreshToken: string;
        };

      console.log("New Access Token:", newAccessToken);
      console.log("New Refresh Token:", newRefreshToken);

      setUserData(user, newAccessToken, newRefreshToken);
    } else {
      console.error("Failed to refresh token: ", response);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
