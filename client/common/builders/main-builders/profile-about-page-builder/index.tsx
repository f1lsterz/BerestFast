import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MainContainerWithHeader from "common/components/main-component/main-container-with-header";
import style from "./style";
import { useUserStore } from "services/storage/user-storage";
import UserAboutContainer from "./components/userAboutContainer";
import { formatDate } from "../profile-builder/utils";
import { useRouter } from "expo-router";

const ProfileAboutPageBuilder = () => {
  const { user } = useUserStore();
  const router = useRouter();
  
  const handleChangeName = () =>{
    router.navigate("/main/profile-change-name-page");
  }

  return (
    <MainContainerWithHeader text="Обліковий запис">
      <View style={style.container}>
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={style.textStyle}>Ім'я акаунту:</Text>
          <UserAboutContainer
            title={user?.name}
            onPress={handleChangeName}
            isButton={true}
          />
          <Text style={style.textStyle}>Номер телефону:</Text>
          <UserAboutContainer
            title={user?.phoneNumber}
            onPress={() => {}}
            isButton={true}
          />
          <Text style={style.textStyle}>Пароль:</Text>
          <UserAboutContainer
            title={"Змінити пароль"}
            onPress={() => {}}
            isButton={true}
          />
          <Text style={style.textStyle}>Акаунт створено:</Text>
          <UserAboutContainer
            title={formatDate(user?.createdAt)}
            onPress={() => {}}
            isButton={false}
          />
        </View>
        <TouchableOpacity style={style.deleteButton}>
          <Text style={style.deleteButtonText}>Видалити обліковий запис</Text>
        </TouchableOpacity>
      </View>
    </MainContainerWithHeader>
  );
};

export default ProfileAboutPageBuilder;
