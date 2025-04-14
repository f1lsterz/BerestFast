import React from "react";
import { View, Text } from "react-native";
import MainContainerForMain from "common/components/main-component/main-container";
import style from "./style";

const MainPageBuilder = () => {
  return (
    <MainContainerForMain>
      <View style = {style.container}>
        <Text>Main</Text>
      </View>
    </MainContainerForMain>
  );
};

export default MainPageBuilder;