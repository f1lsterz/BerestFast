import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import { useRouter } from "expo-router";

const CartPageTextArticle = () => {
  const router = useRouter();

  const handleOnPress = () => {
    router.dismissAll();
    router.dismissTo(("/main/main-page"));
  };

  return (
    <View>
      <Text></Text>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>каталог</Text>
      </TouchableOpacity>
      <Text></Text>
    </View>
  );
};

export default CartPageTextArticle;
