import React from "react";
import { View } from "react-native";
import style from "./style";
import AuthorizationTextInput from "../authrization-textinput";
import CodeInputText from "../authorization-code-textinput";
import { useLocalSearchParams } from "expo-router";

interface AuthorizationCardProps {
  AuthorizationCardContent?: React.ReactNode;
}

const AuthorizationCard: React.FC<AuthorizationCardProps> = ({
  AuthorizationCardContent,
}) => {
  const params = useLocalSearchParams();
  let status: string = "";
  status += params.status;

  return (
    <View style={style.container}>
      {AuthorizationCardContent}
      {status === "sign-in" && <AuthorizationTextInput />}
      {status === "code" && <CodeInputText />}
      {status === "sing-up" && <AuthorizationTextInput />}
    </View>
  );
};

export default AuthorizationCard;
