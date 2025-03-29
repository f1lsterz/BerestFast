import MainContainer from "common/components/main-container";
import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import style from "./style";
import CodeInput from "common/components/code-text-input";
import ResendTimer from "common/components/ResendTimer";
import ContinueButton from "common/components/continue-button";
import CodeTextArticle from "./components";
import { useLocalSearchParams, useRouter } from "expo-router";

const AuthorizationCodePageBuilder = () => {
  const [code, setCode] = useState("");
  const params = useLocalSearchParams();
  const router = useRouter();
  let status: string = "";
  status += params.status;
  const handleOnPress = () => {
    if (status === "sign-in") {
      router.navigate(`authorization/sign-in-password?status=${status}`);
    } else {
      router.navigate(`authorization/sign-up-password?status=${status}`);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={style.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CodeTextArticle />
        <CodeInput code={code} setCode={setCode} />
        <ResendTimer />
        <ContinueButton name={"Продовжити"} onPress={handleOnPress} />
      </KeyboardAvoidingView>
    </MainContainer>
  );
};
export default AuthorizationCodePageBuilder;
