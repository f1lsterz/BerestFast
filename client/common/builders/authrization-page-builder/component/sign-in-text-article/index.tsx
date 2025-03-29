import React from "react";
import { View, Text } from "react-native";
import style from "../../style";

const SignInTextArticle = () => {
  return (
    <View>
      <View style={style.textArticleContainer}>
        <Text style={style.textArticleStyle}>Ласкаво просимо</Text>
      </View>
      <Text style={style.descriptionText}>Введіть свій номер телефону</Text>
    </View>
  );
};

export default SignInTextArticle;