import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import MainContainer from "common/components/main-container";
import style from "./style";
import { useLocalSearchParams, useRouter } from "expo-router";
import SignInText from "./components/signInText";
import SignUpText from "./components/signUpText";
import PasswordInput from "common/components/password-text-input";
import ForgotPasswordButton from "common/components/forgot-password-button";
import ContinueButton from "common/components/continue-button";
import { RegistrationStorage } from "services/storage/registration-storage";
import { LoginStorage } from "services/storage/login-storage";
import { validatePassword } from "common/validators/password-validator";
import ErrorComponent from "common/components/error-component";
import { getDeviceInfo } from "./utils";
import { LoginDto } from "DTOs/authDTOs/loginDto";
import authService from "services/fetches/AuthServise";

const AuthorizationPasswordPageBuilder = () => {
  let loginUser: LoginDto;
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const router = useRouter();
  const [passwordReg, setPasswordReg] = useState("");
  const [IsVisible, setVisible] = useState(false);

  const { setPassword } = RegistrationStorage();
  const { setPasswordLogin, phoneNumber } = LoginStorage();

  //const deviceInfo =  getDeviceInfo();

  console.log(phoneNumber + " 123123")

  //console.log(deviceInfo)

  async function performLogin(loginUser: LoginDto) {
    try{
      const response = await  authService.login(loginUser);
      console.log(response);
    }catch(error){
      console.log(error)
    }
  }

  const handleOnPress = () => {
    let isValid = validatePassword(passwordReg);
    if (isValid) {
      setVisible(false);
      if (status === "sign-in") {
        setPasswordLogin(passwordReg);
        loginUser = {
          phoneNumber: phoneNumber,
          password: passwordReg,
          deviceName: "iPhone 13",
          os: "iOS 17.4",
          appVersion: "1.0.3",
          ipAddress: "192.168.1.1",
        };

        performLogin(loginUser);
        //router.navigate(`authorization/code-page?status=${status}`);
      } else if (status === "sing-up") {
        setPassword(passwordReg);
        router.navigate(`/authorization/auth-user-profile-page`);
      }
    } else {
      setVisible(true);
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
          {IsVisible == true && (
            <View style={{ marginBottom: 10 }}>
              <ErrorComponent
                isModal={false}
                errorMessage="Введіть коректний пароль"
              />
            </View>
          )}
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
