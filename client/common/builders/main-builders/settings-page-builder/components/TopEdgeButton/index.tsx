import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { SettingsButtonProps } from "common/interface/SettingsButtonProps";
import style from "./style";

const TopEdgeButton: React.FC<SettingsButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style.buttonWrapper}>
    <View style={style.buttonBackground} />
    <Text style={style.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default TopEdgeButton;
