import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import ProfileSvg from "common/svg/profile-svg";
import { ProfileButtonProps } from "common/interface/ProfileButtonProps";

const ProfileButton: React.FC<ProfileButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Text style={style.textStyle}>{title}</Text>
      <View style={style.rightArrowContainer}>
        <ProfileSvg.ArrowRightSvg color="White" height={25} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileButton;
