import React from "react";
import { View, Text } from "react-native";
import style from "./style";

const OrderWithOutProductsArticle = () => {
  return (
    <View style={style.textContainer}>
      <Text style={style.textAtricleStyle}>Готові зробити замовлення?</Text>
      <View style = {style.descriptionTextContainer}>
        <Text style={style.descriptionTextStyle}>
          Зайдіть у корзину та замовте товари,
        </Text>
        <Text style={style.descriptionTextStyle}>які були у неї додані</Text>
      </View>
    </View>
  );
};

export default OrderWithOutProductsArticle;
