import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import BackButton from "common/svg/back-button";
import style from "./style";
import { useRouter } from "expo-router";
import { HeaderWithTextArticleComponentProps } from "common/interface/HeaderWithTextArticleComponentProps";

const HeaderWithTextArticleComponent = ({
  text,
}: HeaderWithTextArticleComponentProps) => {
  const router = useRouter();

  const handleOnPress = () => {
    router.back();
  };

  return (
    <View style={style.headerContainer}>
      <TouchableOpacity onPress={handleOnPress} style={style.backbutton}>
        <BackButton />
      </TouchableOpacity>
      <Text style={style.headerText}>{text}</Text>

      <View style={style.backbutton} />
    </View>
  );
};

export default HeaderWithTextArticleComponent;
