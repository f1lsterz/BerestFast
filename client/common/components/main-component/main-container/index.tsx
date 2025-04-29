import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import style from "./style";
import { AuthContainerProps } from "common/interface/AuthContainerProps";

const MainContainerForMain: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.mainContainer}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default MainContainerForMain;
