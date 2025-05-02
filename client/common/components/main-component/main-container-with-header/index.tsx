import React from "react";
import MainContainerForMain from "../main-container";
import { AuthContainerProps } from "common/interface/AuthContainerProps";
import { View } from "react-native";
import HeaderWithTextArticleComponent from "common/components/header-with-text-article-component";
import { MainContainerWithHeaderProps } from "common/interface/MainContainerWithHeaderProps";
import MainContainerDarkBlue from "../main-container-dark-blue";

const MainContainerWithHeader: React.FC<MainContainerWithHeaderProps> = ({
  text,
  children,
}) => {
  return (
    <MainContainerDarkBlue>
      <View>
        <HeaderWithTextArticleComponent text={text} />
        {children}
      </View>
    </MainContainerDarkBlue>
  );
};

export default MainContainerWithHeader;
