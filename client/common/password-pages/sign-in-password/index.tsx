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
import AuthServices from "services/fetches/AuthServices";
import { CreateUserDto } from "DTOs/userDTOs/CreateUserDto";

const SingInAuthPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [newUser, setNewUser] = useState<CreateUserDto>({
    name: "VIVA Doe",
    phoneNumber: "+380990362418",
    password: "password123",
    role: "USER",
  });

  const handleCreateUser = async () => {
    console.log("123")
    try {
      const response = await AuthServices.createUser(newUser);
      console.log("User created:", response);
    } catch (error) {
      console.error("Error creating user:", error);
      console.log(JSON.stringify(error))
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
