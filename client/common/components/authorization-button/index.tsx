import React from "react";
import style from "./style";
import { Text, TouchableOpacity, View } from "react-native";

interface AuthorizationButtonProps {
  AuthorizationButtoContent?: React.ReactNode;
}

const AuthorizationButton: React.FC<AuthorizationButtonProps> = ({
  AuthorizationButtoContent,
}) => {
  return (
    <TouchableOpacity style = {style.buttonStyle}>
      {AuthorizationButtoContent ? (
        AuthorizationButtoContent
      ) : (
        <Text>Default Header</Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthorizationButton;
