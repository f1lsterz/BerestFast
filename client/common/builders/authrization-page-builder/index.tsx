import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import MainContainer from "common/components/main-container";
import style from "./style";
import SignInTextArticle from "./component/sign-in-text-article";
import SingUpTextArticle from "./component/sign-up-text-artcle";
import { useLocalSearchParams, useRouter } from "expo-router";
import PhoneInputField from "common/components/phone-text-input";
import ContinueButton from "common/components/continue-button";

const AuthorizationPageBuilder = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const [phone, setPhone] = useState("+380");
  const router = useRouter();

  const handleOnPress = () => {
    if (status === "sign-in") {
      router.navigate(`authorization/code-page?status=${status}`);
    } else if (status === "sing-up") {
      router.navigate(`/authorization/code-page?status=${status}`);
    }else{
        throw new Error();
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={style.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {status === "sign-in" && <SignInTextArticle />}
        {status === "sing-up" && <SingUpTextArticle />}
        <PhoneInputField phone={phone} setPhone={setPhone} />
        <View style={style.continueButtonContainer}>
          <ContinueButton onPress={handleOnPress} name={"Продовжити"} />
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default AuthorizationPageBuilder;
