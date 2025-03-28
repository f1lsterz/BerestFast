import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import UserIcon from "common/svg/user-icon";
import { CodeInputProps } from "common/interface/CodeInputProps";
import style from "./style";

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode }) => {
  return (
    <View style={style.textInputContainer}>
      <View style={{ marginLeft: 10 }}>
        <UserIcon />
      </View>
      <TextInput
        autoFocus={true}
        style={style.textInput}
        placeholder="Введіть код"
        placeholderTextColor="white"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
      />
    </View>
  );
};

export default CodeInput;
