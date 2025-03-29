import React from "react";
import { View, Text } from "react-native";
import style from "../style";

const CodeTextArticle = () => {
  return (
    <View>
      <View style={style.textArticleContainer}>
        <Text style={style.textArticleStyle}>Підтвердження </Text>
        <Text style={style.textArticleStyle}> телефону</Text>
      </View>
      <Text style={style.descriptionText}>
        Введіть код, надісланий на ваш номер
      </Text>
    </View>
  );
};

export default CodeTextArticle;