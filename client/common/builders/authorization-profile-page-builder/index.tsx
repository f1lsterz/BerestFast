import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import MainContainer from "common/components/main-container";
import ProfileTextInput from "common/components/profile-text-input";
import ProfileArticleText from "./components";
import ContinueButton from "common/components/continue-button";
import style from "./style";
import { RegistrationStorage } from "services/storage/registration-storage";

const AuthorizationProfilePageBuilder = () => {
  const [nameReg, setNameReg] = useState("");

  const { setName} = RegistrationStorage();

  const handleOnPress = () =>{
    setName(nameReg);
  }
 
  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={style.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ProfileArticleText />
        <ProfileTextInput name={nameReg} setName={setNameReg} />
        <View style={style.continueButton}>
          <ContinueButton name={"Зареєструватися"} onPress={handleOnPress} />
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default AuthorizationProfilePageBuilder;
