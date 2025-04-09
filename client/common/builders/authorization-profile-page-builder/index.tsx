import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import MainContainer from "common/components/main-container";
import ProfileTextInput from "common/components/profile-text-input";
import ProfileArticleText from "./components";
import ContinueButton from "common/components/continue-button";
import style from "./style";
import { RegistrationStorage } from "services/storage/registration-storage";
import { validateName } from "common/validators/name-validator";
import { RegistrationDto } from "DTOs/authDTOs/registrationDto";
import authService from "services/fetches/AuthServise";

const AuthorizationProfilePageBuilder = () => {
  const [nameReg, setNameReg] = useState("");
  const [isVisible, setisVisible] = useState(false);
  let registrationData: RegistrationDto;
  const { setName, name, password, phoneNumber } = RegistrationStorage();

  async function performRegistration(registrationData: RegistrationDto) {
    try {
      const response = await authService.register(registrationData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(name + " gggg//// " + password + " ggg/// " + phoneNumber);

  const handleOnPress = () => {
    let IsValid: boolean = validateName(nameReg);
    
    registrationData = {
      name: nameReg,
      password: password,
      phoneNumber: phoneNumber,
      role: "USER",
      deviceName: 'Samsung Galaxy S21',
      os: 'Android 12',
      appVersion: '1.2.0',
      ipAddress: '192.168.1.100',
    };

    if (IsValid) {
      setisVisible(false);
      setName(nameReg);
      performRegistration(registrationData);
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
        <ProfileArticleText />
        <ProfileTextInput name={nameReg} setName={setNameReg} />
        {isVisible && <Text>Помилка</Text>}
        <View style={style.continueButton}>
          <ContinueButton name={"Зареєструватися"} onPress={handleOnPress} />
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default AuthorizationProfilePageBuilder;
