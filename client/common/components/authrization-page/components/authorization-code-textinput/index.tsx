import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import style from "./style";
import CheckmarkIcon from "@client/common/svg/chek-marg-svg";

const CodeInputText = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    if (text.length <= 6) { 
      setVerificationCode(text);
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
        placeholder="Введіть код"
        placeholderTextColor="gray"
        value={verificationCode}
        onChangeText={handleTextChange}
        maxLength={4} 
      />
      <TouchableOpacity style={style.agreeButton} onPress={handleButtonPress}>
        <CheckmarkIcon/>
      </TouchableOpacity>
    </View>
  );
};

export default CodeInputText;
