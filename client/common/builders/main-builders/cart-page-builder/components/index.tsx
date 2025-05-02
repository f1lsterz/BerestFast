import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import { useRouter } from "expo-router";

const CartPageTextArticle = () => {
  const router = useRouter();

  const handleOnPress = () => {
    router.dismissAll();
    router.dismissTo("/main/main-page");
  };

  return (
    <View style={style.mainContainer}>
      <Text style={style.textDefStyle}>Ваш кошик пустий</Text>
      <View style={style.containerCatalogButton}>
        <Text style={style.textDefStyle}>Натисніть </Text>
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={style.buttonTextStyle}>каталог</Text>
        </TouchableOpacity>
        <Text style={style.textDefStyle}> щоб обрати</Text>
      </View>
      <Text style={style.textDefStyle}>бажаний товар</Text>
    </View>
  );
};

export default CartPageTextArticle;
