import React from "react";
import { View, Text } from "react-native";
import MainContainerWithHeader from "common/components/main-component/main-container-with-header";
import style from "./style";
import { useUserStore } from "services/storage/user-storage";
import UserAboutContainer from "./components/userAboutContainer";
import { formatDate } from "../profile-builder/utils";

const ProfileAboutPageBuilder = () => {
  const { user } = useUserStore();

  return (
    <MainContainerWithHeader text="Обліковий запис">
      <View style={style.container}>
        <Text style={style.textStyle}>Ім'я акаунту:</Text>
        <UserAboutContainer title={user?.name} />
        <Text style={style.textStyle}>Номер телефону:</Text>
        <UserAboutContainer title={user?.phoneNumber} />
        <Text style={style.textStyle}>Акаунт створено:</Text>
        <UserAboutContainer title={formatDate(user?.createdAt)} />
      </View>
    </MainContainerWithHeader>
  );
};

export default ProfileAboutPageBuilder;
