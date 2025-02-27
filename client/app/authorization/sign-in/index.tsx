import React from "react";
import { Text, View } from "react-native";
import style from "./style";
import AuthorizationPage from "@client/common/components/authrization-page";
import GlobalStylesForText from "@client/common/global-styles/styles-for-text";

const SignIn = () => {
  return (
    <View style={style.container}>
      <AuthorizationPage
        headerContent={
          <Text style={GlobalStylesForText.textHeaderStyle}>Dely</Text>
        }
        footerContent={<Text style={GlobalStylesForText.textFooterStyle}>Sing In</Text>}
      />
    </View>
  );
};

export default SignIn;
