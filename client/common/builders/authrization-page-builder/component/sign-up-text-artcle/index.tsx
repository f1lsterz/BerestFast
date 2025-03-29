import React from "react";
import { View, Text } from "react-native";
import style from "../../style";

const SingUpTextArticle = () => {
  return (
    <View>
      <View style={style.textArticleContainer}>
        <Text style={style.textArticleStyle}>Вітаємо, це Dely</Text>
      </View>
      <Text style={style.descriptionText}>
        Введіть свій номер телефону для реєстрації
      </Text>
    </View>
  );
};

export default SingUpTextArticle;
