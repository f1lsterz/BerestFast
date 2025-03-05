import React from "react";
import { Text, View } from "react-native";
import style from "./style";
import AuthorizationPage from "@client/common/components/authrization-page";
import GlobalStylesForText from "@client/common/global-styles/styles-for-text";
import SignInMessage from "./components/sign-in-message";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();

  const status = "code";

  const onPress = () => {
    router.navigate(`authorization/code-page?status=${status}`);
  };

  return (
    <View style={style.container}>
      <AuthorizationPage
        headerContent={
          <Text style={GlobalStylesForText.textHeaderStyle}>Dely</Text>
        }
        mainPartContent={<SignInMessage />}
        footerContent={
          <Text style={GlobalStylesForText.textFooterStyle}>Увійти</Text>
        }
        additionalFunction={onPress}
      />
    </View>
  );
};

export default SignIn;
