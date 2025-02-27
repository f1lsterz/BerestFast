import React from "react";
import { Text, View } from "react-native";
import style from "./style";
import HeaderComponent from "../header-component";
import FooterComponent from "../footer-component";
import AuthorizationButton from "../authorization-button";

interface AuthorizationPageProps {
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = ({
  headerContent,
  footerContent,
}) => {
  return (
    <View style={style.constainer}>
      <HeaderComponent headerContent={headerContent} />

      <View style={style.mainPart}></View>

      <FooterComponent
        footerContent={
          <AuthorizationButton AuthorizationButtoContent={footerContent} />
        }
      />
    </View>
  );
};

export default AuthorizationPage;
