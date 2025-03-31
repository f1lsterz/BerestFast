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

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const AuthorizationPasswordPageBuilder = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleOnPress = () => {
    if (status === "sign-in") {
      //router.navigate(`authorization/code-page?status=${status}`);
    } else if (status === "sing-up") {
      //router.navigate(`/authorization/code-page?status=${status}`);
    } else {
      throw new Error();
    }
  };

  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [message, setMessage] = useState("");

  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber("+380990362418");
      setConfirm(confirmation);
      setMessage("Код відправлено!");
    } catch (error) {
      setMessage("Помилка відправки коду: " + error);
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
            password={password}
            setPassword={setPassword}
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
