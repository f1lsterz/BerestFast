import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import style from "./style";
import LockIcon from "common/svg/lock-icon";
import { useRouter } from "expo-router";

const SingInAuthPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForgotPasswordPress = () => {
    router.navigate(`authorization/forgot-password-page`);
  };

  return (
    <KeyboardAvoidingView
      style={style.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.mainContainer}>
        <Text style={style.textArticleStyle}>Введіть пароль</Text>

        <View>
          <View style={style.textInputContainer}>
            <View style={{ marginLeft: 10 }}>
              <LockIcon />
            </View>
            <TextInput
              autoFocus={true}
              style={style.textInput}
              placeholder="Введіть пароль"
              placeholderTextColor="white"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity>
            <Text
              onPress={handleForgotPasswordPress}
              style={style.forgotTextStyle}
            >
              Забули пароль?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={style.singInButton}>
          <Text>Увійти</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingInAuthPassword;
