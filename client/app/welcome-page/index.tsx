import React from "react";
import { View, Text } from "react-native";
import DefaultPage from "@client/common/components/defaultPage";
import SvgComponent from "@client/common/svg/logo";
import ButtonAuthList from "./components";

import style from "./style";

const WellcomePage = () => {
  return (
    <DefaultPage
      headerContent={<Text style={style.textStyle}>Dely</Text>}
      logoContent={<SvgComponent />}
      footerContent={<ButtonAuthList />}  
    />
  );
};

export default WellcomePage;
