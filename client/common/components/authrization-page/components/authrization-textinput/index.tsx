import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import style from "./style";
import CheckmarkIcon from "@client/common/svg/chek-marg-svg";

const AuthorizationTextInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("+380");
  const inputRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    if (!text.startsWith("+380")) {
      setPhoneNumber("+380");
    } else if (text.length <= 13) {
      setPhoneNumber(text);
    }
  };

  const handleButtonPress = () => {
    inputRef.current?.blur(); 
  };

  return (
    <View style={style.container}>
      <TextInput
        ref={inputRef}
        style={style.textInputStyle}
        keyboardType="numeric"
        placeholder="Введіть номер телефону (+380...)"
        placeholderTextColor="gray"
        value={phoneNumber}
        onChangeText={handleTextChange}
        maxLength={13}
      />
      <TouchableOpacity style={style.agreeButton} onPress={handleButtonPress}>
        <CheckmarkIcon/>
      </TouchableOpacity>
    </View>
  );
};

export default AuthorizationTextInput;
