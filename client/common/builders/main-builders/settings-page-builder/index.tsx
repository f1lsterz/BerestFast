import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import authService from "services/fetches/AuthServise";
import { useUserStore } from "services/storage/user-storage";
import { LogoutDto } from "DTOs/authDTOs/logoutDto";
import { useRouter } from "expo-router";
import MainContainerWithHeader from "common/components/main-component/main-container-with-header";
import TopEdgeButton from "./components/TopEdgeButton";
import BottomEdgeButton from "./components/BottomEdgeButton";
import MiddleButton from "./components/MiddleButton";

const SettingsPageBuilder = () => {
  const { refreshToken, clearUserData } = useUserStore();
  const router = useRouter();

  const handleOnPress = async () => {
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

  return (
    <MainContainerWithHeader text="Налаштування">
      <View style={style.mainContainer}>
        <View style={style.containeListOfButtons}>
          <Text style={style.textArticleToListOfButtons}>
            Налаштування акаунту
          </Text>
          <View style={style.listOfButtons}>
            <TopEdgeButton
              title="Номер телефону"
              onPress={() => {
                console.log("working");
              }}
            />
            <MiddleButton
              title="Пароль"
              onPress={() => {
                console.log("WORKING");
              }}
            />
            <MiddleButton
              title="Змінити спосіб оплати"
              onPress={() => {
                console.log("WORKING2");
              }}
            />
            <BottomEdgeButton
              title="Обліковий запис"
              onPress={() => {
                console.log("working1");
              }}
            />
          </View>
        </View>

        <View style={style.containeListOfButtons}>
          <Text style={style.textArticleToListOfButtons}>
            Налаштування акаунту
          </Text>
          <View style={style.listOfButtons}>
            <TopEdgeButton title="Сповіщення" onPress={() => {}} />
            <BottomEdgeButton title="Мова" onPress={() => {}} />
          </View>
        </View>

        <View style={style.containeListOfButtons}>
          <Text style={style.textArticleToListOfButtons}>
            Інформація про програму
          </Text>
          <View style={style.listOfButtons}>
            <TopEdgeButton
              title="Політика конфіденційності"
              onPress={() => {}}
            />
            <MiddleButton title="Умови користування" onPress={() => {}} />
            <BottomEdgeButton title="Підтримка" onPress={() => {}} />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleOnPress}
          style={style.logOutButtonContainer}
        >
          <Text style={style.logOutButtonText}>Вийти з акаунту</Text>
        </TouchableOpacity>
      </View>
    </MainContainerWithHeader>
  );
};

export default SettingsPageBuilder;
