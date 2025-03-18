import React from "react";
import { useLocalSearchParams } from "expo-router";
import MainContainer from "../main-container";
import PhoneLoginScreen from "./components/sign-in";
import PhoneSignUpScreen from "./components/sign-up";

const AuthorizationPage = () => {
  const params = useLocalSearchParams();

  let status: string = "";
  status += params.status;

  return (
    <MainContainer>
      {status === "sign-in" && <PhoneLoginScreen />}
      {status === "sing-up" && <PhoneSignUpScreen />}
    </MainContainer>
  );
};

export default AuthorizationPage;
