import React from "react";
import { View, TextInput } from "react-native";
import PhoneIcon from "common/svg/phone-svg";
import style from "./style";
import { PhoneInputFieldProps } from "common/interface/PhoneInputFieldProps";

const PhoneInputField: React.FC<PhoneInputFieldProps>=({ phone, setPhone }) => {

  return (
    <View style={style.textInputContainer}>
      <PhoneIcon />
      <TextInput
        autoFocus={true}
        style={style.textInput}
        placeholder="+380 XX XXX XX XX"
        placeholderTextColor="white"
        value={phone}
        onChangeText={(text) => {
          if (!text.startsWith("+380")) {
            setPhone("+380");
          } else {
            setPhone(text);
          }
        }}
        keyboardType="phone-pad"
        maxLength={13}
      />
    </View>
  );
};

export default PhoneInputField;
