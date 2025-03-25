import React from "react";
import { Text, View } from "react-native";
import style from "./style";
import AuthorizationPage from "common/components/authorization-page";

const SignIn = () => {
  return (
    <View style={style.container}>
      <AuthorizationPage></AuthorizationPage>
    </View>
  );
};

export default SignIn;
