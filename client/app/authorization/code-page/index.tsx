import React from "react";
import { View, Text } from "react-native";
import style from "./style";
import AuthorizationPage from "@client/common/components/authrization-page";
import GlobalStylesForText from "@client/common/global-styles/styles-for-text";
import CodePageMessage from "./component";
import { useRouter } from "expo-router";

const CodePage = () => {
  const router = useRouter();

  const status = "password";

  const onPress = () => {
    router.navigate(`authorization/password-page?status=${status}`);
  };

  return (
    <AuthorizationPage
      headerContent={
        <Text style={GlobalStylesForText.textHeaderStyle}>Dely</Text>
      }
      mainPartContent={<CodePageMessage />}
      footerContent={
        <Text style={GlobalStylesForText.textFooterStyle}>Продовжити</Text>
      }
      additionalFunction={onPress}
    ></AuthorizationPage>
  );
};

export default CodePage;
