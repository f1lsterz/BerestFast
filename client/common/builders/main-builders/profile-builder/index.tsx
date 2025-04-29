import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import style from "./style";
import { useUserStore } from "services/storage/user-storage";
import MainContainerForMain from "common/components/main-component/main-container";

const ProfilePageBuilder = () => {
  const { user, loadUserDataFromStorage } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await loadUserDataFromStorage();
      console.log("Loaded user data:", result);
    };

    fetchUser();
  }, []);

  const photoUrl =
    user?.photoUrl ??
    "https://cdn.discordapp.com/attachments/1359809129618866297/1360651937497874552/image.png?ex=6803259d&is=6801d41d&hm=4996dc000f8c65d00f358912d6deb74df8f6f0d023266355bcfc9d38e2a28eb3&";

  return (
    <MainContainerForMain>
      <View style={style.mainContainer}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={style.photoContainerStyle} />
        ) : (
          <View style={style.emptyPgotoContainerStyle}>
            <Text style={{ fontSize: 30 }}>👤</Text>
          </View>
        )}

        <View style={style.textContainer}>
          <Text style={style.textStyle}>{user?.name}</Text>
          <Text style={style.textStyle}>{user?.phoneNumber}</Text>
        </View>
      </View>
    </MainContainerForMain>
  );
};

export default ProfilePageBuilder;
