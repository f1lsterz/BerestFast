import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import UserIcon from "common/svg/user-icon";
import ProfileSvg from "common/svg/profile-svg";
import { useUserStore } from "services/storage/user-storage";
import UserAboutComponent from "../userAboutComponent";

const EmptyPhotouserComponent = () => {
  return (
    <View style={style.emptyContainer}>
      <View style={style.emptyPgotoContainerStyle}>
        <Text style={{ fontSize: 30 }}>👤</Text>
      </View>
      <UserAboutComponent />
    </View>
  );
};

export default EmptyPhotouserComponent;
