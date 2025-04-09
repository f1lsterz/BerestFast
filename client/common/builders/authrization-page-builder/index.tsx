import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import MainContainer from "common/components/main-container";
import style from "./style";
import SignInTextArticle from "./component/sign-in-text-article";
import SingUpTextArticle from "./component/sign-up-text-artcle";
import { useLocalSearchParams, useRouter } from "expo-router";
import PhoneInputField from "common/components/phone-text-input";
import ContinueButton from "common/components/continue-button";
import { validatePhoneNumber } from "common/validators/phone-validator";
import { RegistrationStorage } from "services/storage/registration-storage";
import authService from "services/fetches/AuthServise";
import { SendCodeFormValues } from "DTOs/authDTOs/sendCodeFormValues";
import ErrorComponent from "common/components/error-component";
import { LoginStorage } from "services/storage/login-storage";

const AuthorizationPageBuilder = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const [phoneNumber, setPhone] = useState("+380");
  const [isVisible, setisVisible] = useState(false);
  const router = useRouter();

  const { setPhoneNumber } = RegistrationStorage();

  const{ setPhoneNumberLogin} = LoginStorage();


  const handleSendCode = async () => {
    try {
      const payload: SendCodeFormValues =  {phoneNumber} ;
      await authService.sendCode(payload);
    } catch (error) {
      console.error("Помилка надсилання коду", error);
    }
  };

  
  const handleOnPress = () => {
    const isValidUA = validatePhoneNumber(phoneNumber, "UA");
    if (isValidUA) {
      setisVisible(false);
      if (status === "sign-in") {
        setPhoneNumberLogin(phoneNumber);
        router.navigate(`authorization/code-page?status=${status}`);
        //handleSendCode();
      } else if (status === "sing-up") {
        router.navigate(`/authorization/code-page?status=${status}`);
        setPhoneNumber(phoneNumber);
        //handleSendCode();
      }
    } else {
      setisVisible(true);
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
        <PhoneInputField phone={phoneNumber} setPhone={setPhone} />
        {isVisible && <ErrorComponent isModal = {false} errorMessage="Введіть коректний номер телефону"/>}
        <View style={style.continueButtonContainer}>
          <ContinueButton onPress={handleOnPress} name={"Продовжити"} />
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default AuthorizationPageBuilder;
