import React, { useState } from "react";
import { View, Text } from "react-native";
import style from "./style";
import MainContainer from "common/components/main-container";
import CodeInput from "common/components/code-text-input";
import ContinueButton from "common/components/continue-button";
import ResendTimer from "common/components/ResendTimer";
import { useRouter } from "expo-router";

const ForgotPasswordCodePageBuidler = () => {
  
  const router = useRouter();

  const handleOnPress = () => {
    router.navigate(`authorization/forgot-password-pass-page/`);
  };

  const [code, setCode] = useState("");

  return (
    <MainContainer>
      <View style={style.mainContainer}>
        <Text style={style.textStyle}>Підтвердіть номер</Text>
        <Text style={style.descriptionText}>
          Введіть код, надісланий на ваш номер
        </Text>
        <CodeInput code={code} setCode={setCode} />
        <ResendTimer/>
        <View style={style.continueButtonContainer}>
          <ContinueButton name={"Продовжити"} onPress={handleOnPress} />
        </View>
      </View>
    </MainContainer>
  );
};

export default ForgotPasswordCodePageBuidler;
