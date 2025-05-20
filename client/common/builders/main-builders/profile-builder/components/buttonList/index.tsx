import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import ProfileButton from "common/components/main-component/profile-button";
import { LogoutDto } from "DTOs/authDTOs/logoutDto";
import { useRouter } from "expo-router";
import { useUserStore } from "services/storage/user-storage";
import authService from "services/fetches/AuthServise";

const ButtonProfileList = () => {
  const { refreshToken, clearUserData } = useUserStore();
  const router = useRouter();

  const handleOnPressLogOut = async () => {
    if (refreshToken != null) {
      const date: LogoutDto = {
        refreshToken: refreshToken,
        allDevices: false,
      };

      const response = await authService.logout(date);
      clearUserData();
      router.dismissTo("/welcome-page");
    }
  };

  const handleOnPressProfileAbout = () => {
    router.navigate("/main/profile-about-page");
  };

  const handleOnPressOrderHistory = () => {
    router.navigate("/main/order-history-page");
  };

  return (
    <View style={style.buttonsContainer}>
      <ProfileButton
        title="Архів заказів"
        onPress={handleOnPressOrderHistory}
      />
      <ProfileButton
        title="Обліковий запис"
        onPress={handleOnPressProfileAbout}
      />
      <View style={style.stripe} />
      <ProfileButton title="Мова" onPress={() => {}} />
      <ProfileButton title="Сповіщення" onPress={() => {}} />
      <View style={style.stripe} />
      <ProfileButton title="Політика конфіденційності" onPress={() => {}} />
      <ProfileButton title="Умови користування" onPress={() => {}} />
      <ProfileButton title="Підтримка" onPress={() => {}} />
      <ProfileButton title="Часті запитання" onPress={() => {}} />
      <View style={style.logOutButtonContainer}>
        <TouchableOpacity
          onPress={handleOnPressLogOut}
          style={style.logOutButton}
        >
          <Text style={style.logOutButtonText}>Вийти з акаунту</Text>
        </TouchableOpacity>
      </View>
      <View style={style.emptyBlock} />
    </View>
  );
};

export default ButtonProfileList;
