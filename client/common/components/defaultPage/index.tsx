import React from "react";
import { View } from "react-native";
import Style from "./style";
import { DefaultPageProps } from "@client/common/interface/default-page-interface";

const DefaultPage: React.FC<DefaultPageProps> = ({
  headerContent,
  logoContent,
  footerContent,
}) => {
  return (
    <View style = {Style.mainContainer}>
      <View>{logoContent}</View>
      <View>{footerContent}</View>
    </View>
  );
};

export default DefaultPage;
