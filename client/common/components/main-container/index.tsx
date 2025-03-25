import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import style from "./style";
import { AuthContainerProps } from "common/interface/AuthContainerProps";
import HeaderComponent from "../header-component";

const MainContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.mainContainer}>
        <HeaderComponent />
        {children}
      </View>
    </SafeAreaView>
  );
};

export default MainContainer;
