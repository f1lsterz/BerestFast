import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import MainContainer from "common/components/main-container";
import style from "./style";
import SignInTextArticle from "./component/sign-in-text-article";
import SingUpTextArticle from "./component/sign-up-text-artcle";
import { useLocalSearchParams, useRouter } from "expo-router";
import PhoneInputField from "common/components/phone-text-input";
import ContinueButton from "common/components/continue-button";
import { validatePhoneNumber } from "common/components/phone-validator";
import { RegistrationStorage } from "services/storage/registration-storage";

const AuthorizationPageBuilder = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const [phone, setPhone] = useState("+380");
  const router = useRouter();

  const { setPhoneNumber , phoneNumber } = RegistrationStorage();

  const handleOnPress = () => {
    const isValidUA = validatePhoneNumber(phone, "UA");

    if (status === "sign-in" && isValidUA) {
      router.navigate(`authorization/code-page?status=${status}`);
      setPhoneNumber(phone);
    } else if (status === "sing-up" && isValidUA) {
      router.navigate(`/authorization/code-page?status=${status}`);
      setPhoneNumber(phone);
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
