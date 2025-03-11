import React from "react";
import { TouchableOpacity, View } from "react-native";
import BackButton from "@client/common/svg/back-button";
import style from "./style";
import { useRouter } from "expo-router";

const HeaderComponent = () => {
  const router = useRouter();

  const handleOnPress = () => {router.back()};

  return (
    <View style={style.headerContainer}>
      <TouchableOpacity onPress={handleOnPress} style={style.backbutton}>
        <BackButton />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
