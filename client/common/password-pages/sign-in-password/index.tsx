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
import AuthServise from "services/fetches/AuthServise";
import { RegistrationDto } from "DTOs/loginDTOs/registrationDto";

const SingInAuthPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [newUser, setNewUser] = useState<RegistrationDto>({
    name: "John Doe",
    password: "securepassword123",
    phoneNumber: "+380990562418",
    role: "USER",
    deviceName: "iPhone 13 Pro",
    os: "iOS 17.3",
    appVersion: "1.2.5",
    ipAddress: "192.168.1.1", 
  });

  const handleCreateUser = async () => {
    try {
      const response = await AuthServise.register(newUser);
      console.log("User registered:", response);
    } catch (error) {
      console.error("Error registering user:", error);
    }
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
            <Text style={style.forgotTextStyle}>Забули пароль?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleCreateUser} style={style.singInButton}>
          <Text>Увійти</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingInAuthPassword;
