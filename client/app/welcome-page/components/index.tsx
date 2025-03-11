import React from "react";
import style from "../style";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const ButtonAuthList = () => {
  const router = useRouter();

  const statusForSignIn = "sign-in";
  const statusForSignUp = "sing-up";

  return (
    <View style={style.buttonListContainer}>
      <TouchableOpacity
        onPress={() =>
          router.navigate(`authorization/code-page?status=${statusForSignIn}`)
        }
        style = {style.signInButton}
      >
        <Text>Увійти</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.navigate(`authorization/code-page??status=${statusForSignUp}`)
        }
        style = {style.signUpButton}
      >
        <Text>Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAuthList;
