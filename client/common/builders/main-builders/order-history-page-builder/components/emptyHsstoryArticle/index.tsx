import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import OrderSvg from "common/svg/order-svg";
import { useRouter } from "expo-router";

const EmptyHistoryArticle = () => {
  const router = useRouter();

  const handleOnPress = () => {
    router.navigate("/main/main-page");
  };

  return (
    <View style={style.textContainer}>
      <OrderSvg.EmptyOrderSvg height={200} color="White" />
      <View style={style.textArticleContainer}>
        <Text style={style.textStyle}>Історія ваших замолень пуста</Text>
        <View style={style.container}>
          <Text style={style.textStyle}>Натисніть</Text>
          <TouchableOpacity onPress={handleOnPress}>
            <Text style={style.textContainerButton}> каталог </Text>
          </TouchableOpacity>
          <Text style={style.textStyle}>щоб </Text>
        </View>
        <Text style={style.textStyle}>замовити товар</Text>
      </View>
    </View>
  );
};

export default EmptyHistoryArticle;
