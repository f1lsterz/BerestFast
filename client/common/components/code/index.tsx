import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import style from "./style";
import UserIcon from "@client/common/svg/user-icon";
import MainContainer from "../main-container";
import { useLocalSearchParams, useRouter } from "expo-router";

const VerificationScreen = () => {
  const [code, setCode] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;

  const codeInputRef = useRef<TextInput>(null);
  const router = useRouter();

  useEffect(() => {
    requestAnimationFrame(() => {
      codeInputRef.current?.focus();
    });

    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  // Таймер на повторне відправлення коду
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      // Логіка повторної відправки коду
      console.log("Код повторно надіслано");
    }
  };

  const handleOnPress = () => {
    router.navigate(`authorization/sign-in?status=${status}`);
  };

  return (
    <MainContainer>
      <KeyboardAvoidingView
        style={style.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={style.mainContainer}>
          <View style={style.textArticleContainer}>
            <Text style={style.textArticleStyle}>Підтвердження </Text>
            <Text style={style.textArticleStyle}> телефону</Text>
          </View>
          <Text style={style.descriptionText}>
            Введіть код, надісланий на ваш номер
          </Text>
          {/* Поле вводу коду */}
          <View style={style.textInputContainer}>
            <View style={{ marginLeft: 10 }}>
              <UserIcon />
            </View>
            <TextInput
              ref={codeInputRef}
              style={style.textInput}
              placeholder="Введіть код"
              placeholderTextColor="white"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
          <TouchableOpacity
            onPress={handleOnPress}
            style={style.agreeCodeButton}
          >
            <Text style={{ fontSize: 20 }}>Підтвердити код</Text>
          </TouchableOpacity>

          <View>
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={style.descriptionText}>Відправити код ще раз</Text>
              </TouchableOpacity>
            ) : (
              <Text style={style.descriptionText}>
                Повторна відправка через {timer} сек
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default VerificationScreen;
