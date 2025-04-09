import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import style from "./style";

type ErrorComponentProps = {
  isModal: boolean;
  errorMessage: string;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  isModal,
  errorMessage,
}) => {
  if (!errorMessage) return null;

  return (
    <View>
      <Text style = {style.errorMessageTextStyle}>{errorMessage}</Text>
    </View>
  );
};

export default ErrorComponent;
