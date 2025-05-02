import React from "react";
import { View, Text, Image } from "react-native";
import style from "./style";
import { UserPhotoComponentProps } from "common/interface/UserPhotoComponentProps";
import UserAboutComponent from "../userAboutComponent";

const UserPhotoComponent: React.FC<UserPhotoComponentProps> = ({
  photoUrl,
}) => {
  const photoUrl_ =
    "https://media.discordapp.net/attachments/1237277551559184395/1352653074384027741/image.png?ex=68143098&is=6812df18&hm=a8035d979e29944ffc1596021d1f316d65fd165920a556726029d34b7ec6db98&=&format=webp&quality=lossless";

  return (
    <View style={style.photoContainer}>
      <Image source={{ uri: photoUrl_ }} style={style.photoContainerStyle} />
      <UserAboutComponent />
    </View>
  );
};

export default UserPhotoComponent;
