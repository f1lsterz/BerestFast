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
import style from "./style";
import { useLocalSearchParams, useRouter } from "expo-router";
import PhoneIcon from "common/svg/phone-svg";

const PhoneLoginScreen = () => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;
  const [phone, setPhone] = useState("");
  const router = useRouter();



  const handleNext = () => {
    router.navigate(`/authorization/sign-in-password?status=${status}`);
  };
  

  return (
    <KeyboardAvoidingView
      style={style.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.mainContainer}>
        <View style={style.textArticleContainer}>
          <Text style={style.textArticleStyle}>Ласкаво просимо</Text>
        </View>
        <Text style={style.descriptionText}>Введіть свій номер телефону</Text>
        <View style={style.textInputContainer}>
          <PhoneIcon />
          <TextInput
            autoFocus={true}
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

export default PhoneLoginScreen;
