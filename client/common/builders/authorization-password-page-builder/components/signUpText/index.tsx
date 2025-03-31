import React from "react";
import { View, Text } from "react-native";
import style from "../../style";

const SignUpText = () => {
  return (
    <View>
      <Text style={style.textArticleStyle}>Введіть пароль</Text>
      <Text style={style.descriptionText}>щоб зареєєструватися</Text>
    </View>
  );
};

export default SignUpText;
