import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import style from "./style";
import { SettingsButtonProps } from "common/interface/SettingsButtonProps";

const MiddleButton: React.FC<SettingsButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style.buttonWrapper}>
    <View style={style.buttonBackground} />
    <Text style={style.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default MiddleButton;
