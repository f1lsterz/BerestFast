import React from "react";
import { View, Text } from "react-native";
import style from "./style";
import UserIcon from "common/svg/user-icon";
import ProfileSvg from "common/svg/profile-svg";
import { useUserStore } from "services/storage/user-storage";

const UserAboutComponent = () => {
  const { user } = useUserStore();
  return (
    <View>
      <View style={style.textNameContainer}>
        <UserIcon />
        <Text style={style.textStyle}>{user?.name}</Text>
      </View>
      <View style={style.textPhoneNumberContainer}>
        <ProfileSvg.PhoneNumberSvg color="White" height={25} />
        <Text style={style.textStyle}>{user?.phoneNumber}</Text>
      </View>
    </View>
  );
};

export default UserAboutComponent;
