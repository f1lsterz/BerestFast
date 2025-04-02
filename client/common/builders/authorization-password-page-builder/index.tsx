import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import MainContainer from "common/components/main-container";
import style from "./style";
import { useLocalSearchParams, useRouter } from "expo-router";
import SignInText from "./components/signInText";
import SignUpText from "./components/signUpText";
import PasswordInput from "common/components/password-text-input";
import ForgotPasswordButton from "common/components/forgot-password-button";
import ContinueButton from "common/components/continue-button";
import { RegistrationStorage } from "services/storage/registration-storage";

const AuthorizationPasswordPageBuilder = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const router = useRouter();
  const [passwordReg, setPasswordReg] = useState("");

  const { setPassword , password , phoneNumber} = RegistrationStorage();

  const handleOnPress = () => {
    if (status === "sign-in") {
      //router.navigate(`authorization/code-page?status=${status}`);
    } else if (status === "sing-up") {
      setPassword(passwordReg);
      router.navigate(`/authorization/auth-user-profile-page`);
    }
  };


  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={style.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {status === "sing-up" && <SignUpText />}
        {status == "sign-in" && <SignInText />}
        <View>
          <PasswordInput
            placeholder="Введіть пароль"
            password={passwordReg}
            setPassword={setPasswordReg}
          />
          {status == "sign-in" && <ForgotPasswordButton />}
        </View>
        {status === "sing-up" && (
          <ContinueButton name="Зареєстуватися" onPress={handleOnPress} />
        )}
        {status == "sign-in" && (
          <ContinueButton name="Увійти" onPress={handleOnPress} />
        )}
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default AuthorizationPasswordPageBuilder;
