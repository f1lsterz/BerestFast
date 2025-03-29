import React from "react";
import { View } from "react-native";
import style from "./style";
import AuthorizationPageBuilder from "common/builders/authrization-page-builder";

const SignIn = () => {
  return (
    <View style={style.container}>
      <AuthorizationPageBuilder/>
    </View>
  );
};

export default SignIn;
