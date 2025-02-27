import React from "react";
import { View } from "react-native";
import Style from "./style";
import HeaderComponent from "../header-component";

interface DefaultPageProps {
  headerContent: React.ReactNode;
  logoContent: React.ReactNode;
  footerContent: React.ReactNode;
}

const DefaultPage: React.FC<DefaultPageProps> = ({
  headerContent,
  logoContent,
  footerContent,
}) => {
  return (
    <View style={Style.container}>
      <HeaderComponent headerContent={headerContent}/>

      <View style={Style.mainPart}>{logoContent}</View>

      <View style={Style.footer}>{footerContent}</View>
    </View>
  );
};

export default DefaultPage;
