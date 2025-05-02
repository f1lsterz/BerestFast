import React from "react";
import { View, Text } from "react-native";
import style from "./style";
import { userAboutContainerProps } from "common/interface/userAboutContainerProps";

const UserAboutContainer: React.FC<userAboutContainerProps> = ({ title }) => {
  return (
    <View style={style.aboutinformationTextContainer}>
      <Text style={style.aboutinformationText}>{title}</Text>
    </View>
  );
};

export default UserAboutContainer;
