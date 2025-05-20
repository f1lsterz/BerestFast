import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "./style";
import CustomButton from "./component";
import { usePathname, useRouter } from "expo-router";
import NavBarSvg from "common/svg/bottom-navbar-svg";

const FooterContainer = () => {
  const bottomButtom: string[] = ["Головна", "Замовлення", "Профіль"];
  const pathName = usePathname();
  const router = useRouter();

  console.log(pathName);
  const [Selected, setSelected] = useState("");

  const [isOrderSelected, setIsOrderSelected] = useState(false);
  const [isMainSelected, setisMainSelected] = useState(false);
  const [isProfileSelected, setisProfileSelected] = useState(false);

  useEffect(() => {
    setIsOrderSelected(
      pathName === "/main/order-page" || pathName === "/main/cart-page"
    );
  }, [pathName]);

  useEffect(() => {
    setisProfileSelected(
      pathName === "/main/profile-page" ||
        pathName === "/main/profile-about-page" ||
        pathName === "/main/order-history-page" ||
        pathName === "profile-change-name-page-builder"
    );
  }, [pathName]);

  useEffect(() => {
    setisMainSelected(pathName === "/main/main-page");
  }, [pathName]);

  const mainButton = () => {
    return (
      <CustomButton
        selected={isMainSelected}
        color="Primary"
        unselectedColor="DarkGray"
        text={bottomButtom[0]}
        pressHandle={handlMainnButtonh}
        Svg={() =>
          isMainSelected ? (
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
        selected={isOrderSelected}
        color="Primary"
        unselectedColor="DarkGray"
        text={bottomButtom[1]}
        pressHandle={handlOrderButtonh}
        Svg={() =>
          isOrderSelected ? (
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
        selected={isProfileSelected}
        color="Primary"
        unselectedColor="DarkGray"
        text={bottomButtom[2]}
        pressHandle={handlProfileButtonh}
        Svg={() =>
          isProfileSelected ? (
            <NavBarSvg.ProfileIcon height={25} color="Primary" />
          ) : (
            <NavBarSvg.ProfileIcon height={25} color="DarkGray" />
          )
        }
      />
    );
  };

  function handlMainnButtonh() {
    if (pathName !== "/main/main-page") {
      router.dismissTo("/main/main-page");
    }
  }
  function handlOrderButtonh() {
    if (pathName !== "/main/order-page") {
      router.dismissTo("/main/order-page");
    }
  }

  function handlProfileButtonh() {
    if (pathName !== "/main/profile-page") {
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
