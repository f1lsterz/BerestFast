import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import style from "./style";
import { ContinueButtonProps } from "common/interface/ContinueButtonProps";

const ContinueButton: React.FC<ContinueButtonProps> = ({ onPress, name }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={style.agreeCodeButton}>
        <Text style={{ fontSize: 20 }}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueButton;
