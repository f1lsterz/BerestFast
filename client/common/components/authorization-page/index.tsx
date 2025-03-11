import React from "react";
import { View, SafeAreaView } from "react-native";
import style from "./style";
import { useLocalSearchParams } from "expo-router";
import HeaderComponent from "../header-component";
import SingInAuthPassword from "./components/sign-in-password";

const AuthorizationPage = () => {
  const params = useLocalSearchParams();

  let status: string = "";
  status += params.status;

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.mainContainer}>
        <HeaderComponent />
      </View>
    </SafeAreaView>
  );
};

export default AuthorizationPage;
