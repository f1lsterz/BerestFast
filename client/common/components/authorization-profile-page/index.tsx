import React from "react";
import MainContainer from "../main-container";
import { View, Text } from "react-native";
import style from "./style";

const AuthProfileRegPage = () => {
  return (
    <MainContainer>
      <View style={style.textContainer}>
        <Text style={style.styleArticleText}>Введіть ваше ім'я</Text>
      </View>
    </MainContainer>
  );
};

export default AuthProfileRegPage;
