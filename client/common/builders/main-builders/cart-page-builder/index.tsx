import React from "react";
import { View } from "react-native";
import style from "./style";
import MainContainer from "common/components/main-container";
import OrderSvg from "common/svg/order-svg";
import CartPageTextArticle from "./components";

const CartPageBuilder = () => {
  return (
    <MainContainer>
      <View style={style.container}>
        <OrderSvg.SmallCartSvg height={100} color="White" />
        <CartPageTextArticle/>
      </View>
    </MainContainer>
  );
};

export default CartPageBuilder;
