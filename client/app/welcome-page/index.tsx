import React, { useEffect } from "react";
import { View, Text } from "react-native";
import DefaultPage from "common/components/defaultPage";
import SvgComponent from "common/svg/logo";
import ButtonAuthList from "./components";
import { useUserStore } from "services/storage/user-storage";
import style from "./style";

const WelcomePage = () => {
  const { user, loadUserDataFromStorage } = useUserStore();

  console.log("user:" + JSON.stringify(user));

  useEffect(() => {
    const fetchUser = async () => {
      const result = await loadUserDataFromStorage();
      console.log("Loaded user data:", result);
    };

    fetchUser();
  }, []);

  return (
    <DefaultPage
      headerContent={<Text>Dely</Text>}
      logoContent={<SvgComponent />}
      footerContent={<ButtonAuthList />}
    />
  );
};

export default WelcomePage;
