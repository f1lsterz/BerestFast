import React from "react";
import { View, Text } from "react-native";
import DefaultPage from "common/components/defaultPage";
import SvgComponent from "common/svg/logo";
import ButtonAuthList from "./components";

import style from "./style";

const WelcomePage = () => {
  return (
    <DefaultPage
      headerContent={<Text>Dely</Text>}
      logoContent={<SvgComponent />}
      footerContent={<ButtonAuthList />}  
    />
  );
};

export default WelcomePage;
