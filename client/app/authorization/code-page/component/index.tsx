import React from "react";
import { View, Text } from "react-native";
import style from "./style";

const CodePageMessage = () => {
  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Text style={style.textStyle}>Введіть код</Text>
        <Text style={style.textStyle}>підтвердження</Text>
      </View>
      <Text style={style.smallText}>
        Це важливо для підтвердження вашого акаунту
      </Text>
    </View>
  );
};

export default CodePageMessage;
