import React, { useState } from "react";
import MainContainer from "common/components/main-container";
import PhoneInputField from "common/components/phone-text-input";
import { View, Text } from "react-native";
import style from "./style";
import ContinueButton from "common/components/continue-button";
import { useRouter } from "expo-router";

const ForgorPasswordPageBuilder = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("+380");

  const handleOnPress = () => {
    router.navigate(`authorization/forgot-password-code/`);
  };

  return (
    <MainContainer>
      <View style={style.mainContainer}>
        <Text style={style.textStyle}>Введіть ваш номер</Text>
        <Text style={style.textStyle}>телефону</Text>
        <Text style={style.descriptionText}>
          Це потрібно для підтвердження вашої особистості, щоб змінити пароль
        </Text>
        <PhoneInputField phone={phone} setPhone={setPhone} />
        <View style={style.continueButtonContainer}>
          <ContinueButton
            onPress={handleOnPress}
            name={"Підтвердити телефон"}
          />
        </View>
      </View>
    </MainContainer>
  );
};

export default ForgorPasswordPageBuilder;
