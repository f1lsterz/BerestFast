import React from "react";
import styles from "./style";
import { Text, TouchableOpacity, View } from "react-native";

interface AuthorizationButtonProps {
  AuthorizationButtoContent?: React.ReactNode;
  additionalFunction?: () => void;
}

const AuthorizationButton: React.FC<AuthorizationButtonProps> = ({
  AuthorizationButtoContent,
  additionalFunction
}) => {
  return (
    <TouchableOpacity onPress={additionalFunction} style = {styles.buttonStyle}>
      {AuthorizationButtoContent ? (
        AuthorizationButtoContent
      ) : (
        <Text>Default Header</Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthorizationButton;
