import React from "react";
import { Text, View } from "react-native";
import style from "./style";
import HeaderComponent from "../header-component";
import FooterComponent from "../footer-component";
import AuthorizationButton from "./components/authorization-button";
import AuthorizationCard from "./components/authoziration-card";
import { useLocalSearchParams } from "expo-router";

interface AuthorizationPageProps {
  headerContent?: React.ReactNode;
  mainPartContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  additionalFunction?: () => void;
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = ({
  headerContent,
  mainPartContent,
  footerContent,
  additionalFunction
}) => {


  return (
    <View style={style.constainer}>
      <HeaderComponent headerContent={headerContent} />

      <View style={style.mainPart}>
        <AuthorizationCard AuthorizationCardContent={mainPartContent} />
      </View>

      <FooterComponent
        footerContent={
          <AuthorizationButton additionalFunction={additionalFunction} AuthorizationButtoContent={footerContent} />
        }
      />
    </View>
  );
};

export default AuthorizationPage;
