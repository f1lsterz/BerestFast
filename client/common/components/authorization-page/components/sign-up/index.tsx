import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import style from "../sign-in/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import PhoneIcon from "common/svg/phone-svg";

const PhoneSignUpScreen = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const [phone, setPhone] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const phoneInputRef = useRef<TextInput>(null);
  const router = useRouter();

  useEffect(() => {
    requestAnimationFrame(() => {
      phoneInputRef.current?.focus();
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

  const handleNext = () => {
    router.navigate(`/authorization/code-page?status=${status}`);
  };

  return (
    <KeyboardAvoidingView
      style={style.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.mainContainer}>
        <View style={style.textArticleContainer}>
          <Text style={style.textArticleStyle}>Вітаємо, це Dely</Text>
        </View>
        <Text style={style.descriptionText}>
          Введіть свій номер телефону для реєстрації
        </Text>
        <View style={style.textInputContainer}>
          <PhoneIcon />
          <TextInput
            ref={phoneInputRef}
            style={style.textInput}
            placeholder="+380 XX XXX XX XX"
            placeholderTextColor="white"
            value={phone}
            onChangeText={(text) => {
              if (!text.startsWith("+380")) {
                setPhone("+380");
              } else {
                setPhone(text);
              }
            }}
            keyboardType="phone-pad"
            maxLength={13}
          />
        </View>

        <TouchableOpacity
          onPress={handleNext}
          style={style.agreeCodeButton}
          disabled={phone.length < 10}
        >
          <Text style={{ fontSize: 20 }}>Продовжити</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhoneSignUpScreen;
