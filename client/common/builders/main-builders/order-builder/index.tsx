import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import OrderSvg from "common/svg/order-svg";
import OrderWithOutProductsArticle from "./components";

const OrderPageBuilder = () => {
  return (
    <View>
      <View style={style.header}>
        <View style={style.buttonContainer} />
        <Text style={style.headerTextStyle}>Ваші замовлення</Text>
        <TouchableOpacity style={style.buttonContainer}>
          <OrderSvg.SmallCartSvg height={30} color="Gray" />
        </TouchableOpacity>
      </View>
      <View style = {style.svgContainer}>
        <OrderSvg.EmptyOrderSvg color="White" height={150} />
      </View>
      <OrderWithOutProductsArticle />
    </View>
  );
};

export default OrderPageBuilder;
