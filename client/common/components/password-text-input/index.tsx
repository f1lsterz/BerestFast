import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import LockIcon from "common/svg/lock-icon";
import { PasswordInputProps } from "common/interface/PasswordInputProps";
import style from "./style";

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  password,
  setPassword,
}) => {
  return (
    <View style={style.textInputContainer}>
      <View style={{ marginLeft: 10 }}>
        <LockIcon />
      </View>
      <TextInput
        autoFocus={true}
        style={style.textInput}
        placeholder={placeholder}
        placeholderTextColor="white"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </View>
  );
};

export default  PasswordInput;