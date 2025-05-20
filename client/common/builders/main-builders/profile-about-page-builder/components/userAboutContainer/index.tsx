import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import { userAboutContainerProps } from "common/interface/userAboutContainerProps";
import ProfileSvg from "common/svg/profile-svg";

const UserAboutContainer: React.FC<userAboutContainerProps> = ({
  title,
  onPress,
  isButton,
}) => {
  return isButton ? (
    <TouchableOpacity
      style={style.aboutinformationTextContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={style.textContainer}>
        <Text style={style.aboutinformationText}>{title}</Text>
      </View>
      <ProfileSvg.ArrowRightSvg height={25} color="White" />
    </TouchableOpacity>
  ) : (
    <View style={style.containerNotButton}>
      <View style={style.textContainer}>
        <Text style={style.aboutText}>{title}</Text>
      </View>
    </View>
  );
};

export default UserAboutContainer;
