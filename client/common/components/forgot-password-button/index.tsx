import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import style from "./style";

const ForgotPasswordButton = () => {
  const router = useRouter();

  const handleForgotPasswordPress = () => {
    router.navigate(`authorization/forgot-password-page`);
  };

  return (
    <TouchableOpacity onPress={handleForgotPasswordPress}>
      <Text style={style.forgotTextStyle}>Забули пароль?</Text>
    </TouchableOpacity>
  );
};

export default ForgotPasswordButton;
