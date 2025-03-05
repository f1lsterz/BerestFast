import React from "react";
import style from "../style";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const ButtonAuthList = () => {
  const router = useRouter();

  const statusForSignIn = "sign-in";
  const statusForSignUp = "sing-up";

 
  return (
    <>
      <TouchableOpacity
        onPress={() => router.navigate(`authorization/sign-in?status=${statusForSignIn}`)}
        style={style.SingUpButton}
      >
        <Text style={style.SingUpButtonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate(`authorization/sign-up?status=${statusForSignUp}`)}  
        style={style.SingInButton}
      >
        <Text style={style.SingInButtonText}>Sign up</Text>
      </TouchableOpacity>
    </>
  );
};

export default ButtonAuthList;
