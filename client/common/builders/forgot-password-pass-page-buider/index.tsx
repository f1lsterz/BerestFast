import React, { useState } from "react";
import { View, Text } from "react-native";
import style from "./style";
import MainContainer from "common/components/main-container";
import PasswordInput from "common/components/password-text-input";
import ContinueButton from "common/components/continue-button";
import { useRouter } from "expo-router";

const ForgotPasswordPassPageBuilder = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [isSame, setIsSame] = useState(true);

  const handleOnPress = () => {
    setIsSame(password === newPassword);
  };

  return (
    <MainContainer>
      <View style={style.mainComntainer}>
        <Text style={style.textArticleStyle}>Створіть новий</Text>
        <Text style={style.textArticleStyle}>пароль</Text>
        <View style={style.passwordInputContainer}>
          <PasswordInput
            placeholder="Введіть новий пароль"
            password={password}
            setPassword={setPassword}
          />
          <PasswordInput
            placeholder="Повторно введіть новий пароль"
            password={newPassword}
            setPassword={setnewPassword}
          />
        </View>
        {!isSame && <Text style={style.passwordError}>Паролі різні</Text>}
        <View style={style.continueButtonContainer}>
          <ContinueButton name={"Продовжити"} onPress={handleOnPress} />
        </View>
      </View>
    </MainContainer>
  );
};

export default ForgotPasswordPassPageBuilder;
