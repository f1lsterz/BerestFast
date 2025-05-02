import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import style from "./style";
import { useUserStore } from "services/storage/user-storage";
import MainContainerForMain from "common/components/main-component/main-container";
import { refreshTokenFunc } from "services/utils/refreshTockenFunc";
import EmptyPhotouserComponent from "./components/emptyUserComponent";
import UserPhotoComponent from "./components/userPhotoComponent";
import ButtonProfileList from "./components/buttonList";

const ProfilePageBuilder = () => {
  const { user, loadUserDataFromStorage } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await loadUserDataFromStorage();
      console.log("Loaded user data:", result);
    };

    fetchUser();
  }, []);

  const photoUrl ="";

  return (
    <MainContainerForMain>
      <View style={style.mainContainer}>
        {photoUrl ? (
          <UserPhotoComponent photoUrl={photoUrl} />
        ) : (
          <EmptyPhotouserComponent />
        )}
      </View>
      <ScrollView style={style.centralPart}>
        <Text style={style.textStyle}>Профіль</Text>
        <ButtonProfileList />
      </ScrollView>
    </MainContainerForMain>
  );
};

export default ProfilePageBuilder;
