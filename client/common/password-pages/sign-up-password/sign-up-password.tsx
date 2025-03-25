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
import style from "../sign-in-password/style";
import LockIcon from "common/svg/lock-icon";
import { useRouter } from "expo-router";

const SingUpAuthPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handeleOnPress = () => {
    router.navigate(`authorization/auth-user-profile-page`);
  };

  return (
    <KeyboardAvoidingView
      style={style.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.mainContainer}>
        <Text style={style.textArticleStyle}>Введіть пароль</Text>
        <Text style={style.descriptionText}>щоб зареєєструватися</Text>
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
        </View>

        <TouchableOpacity onPress={handeleOnPress} style={style.singInButton}>
          <Text>Увійти</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingUpAuthPassword;
