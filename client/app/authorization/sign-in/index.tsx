import React from "react";
import { Text, View } from "react-native";
import style from "./style";
import { useRouter } from "expo-router";
import AuthorizationPage from "@client/common/components/authorization-page";

const SignIn = () => {
  return (
    <View style={style.container}>
      <AuthorizationPage></AuthorizationPage>
    </View>
  );
};

export default SignIn;
