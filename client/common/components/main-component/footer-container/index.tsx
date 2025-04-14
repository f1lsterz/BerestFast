import React, { useState } from "react";
import { Text, View } from "react-native";
import style from "./style";
import CustomButton from "./component";
import { CustomColors } from "common/enum/colors";
import { usePathname, useRouter } from "expo-router";
import NavBarSvg from "common/svg/bottom-navbar-svg";

const FooterContainer = () => {
  const bottomButtom: string[] = ["Головна", "Замовлення", "Профіль"];
  const pathName = usePathname();
  const router = useRouter();

  console.log(pathName);
  const [Selected, setSelected] = useState("");

  const mainButton = () => {
    return (
      <CustomButton
        selected={pathName === "/main/main-page"}
        color="Primary"
        unselectedColor="DarkGray"
        text={bottomButtom[0]}
        pressHandle={handlMainnButtonh}
        Svg={() =>
          pathName === "/main/main-page" ? (
            <NavBarSvg.HomeSvg height={25} color="Primary" />
          ) : (
            <NavBarSvg.HomeSvg height={25} color="DarkGray" />
          )
        }
      />
    );
  };

  const orderButton = () => {
    return (
      <CustomButton
        selected={pathName === "/main/order-page"}
        color="Primary"
        unselectedColor="DarkGray"
        text={bottomButtom[1]}
        pressHandle={handlOrderButtonh}
        Svg={() =>
          pathName === "/main/order-page" ? (
            <NavBarSvg.OrderSvg height={25} color="Primary" />
          ) : (
            <NavBarSvg.OrderSvg height={25} color="DarkGray" />
          )
        }
      />
    );
  };

  const profileButton = () => {
    return (
      <CustomButton
        selected={pathName === "/main/profile-page"}
        color="Primary"
        unselectedColor="DarkGray"
        text={bottomButtom[2]}
        pressHandle={handlProfileButtonh}
        Svg={() =>
          pathName === "/main/profile-page" ? (
            <NavBarSvg.ProfileIcon height={25} color="Primary" />
          ) : (
            <NavBarSvg.ProfileIcon height={25} color="DarkGray" />
          )
        }
      />
    );
  };

  function handlMainnButtonh() {
    if (Selected !== "/main/main-page") {
      setSelected("/main/main-page");
      console.log(1);
      router.dismissTo("/main/main-page");
    }
  }
  function handlOrderButtonh() {
    if (Selected !== "/main/order-page") {
      setSelected("/main/order-page");
      console.log(2);
      router.dismissTo("/main/order-page");
    }
  }

  function handlProfileButtonh() {
    if (Selected !== "/main/profile-page") {
      setSelected("/main/profile-page");
      console.log(3);
      router.dismissTo("/main/profile-page");
    }
  }

  return (
    <View style={style.container}>
      {mainButton()}
      {orderButton()}
      {profileButton()}
    </View>
  );
};

export default FooterContainer;
