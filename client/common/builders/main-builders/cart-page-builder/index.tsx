import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import style from "./style";
import MainContainer from "common/components/main-container";
import OrderSvg from "common/svg/order-svg";
import CartPageTextArticle from "./components";
import useCartStore from "services/storage/cart-storage";

const CartPageBuilder = () => {
  const items = useCartStore((state) => state.items);

  return (
    <MainContainer>
      <View style={style.container}>
        {items.length === 0 ? (
          <>
            <OrderSvg.SmallCartSvg height={100} color="White" />
            <CartPageTextArticle />
          </>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <Text style={{ color: "white", fontSize: 18 }}>{item.name}</Text>
            )}
          />
        )}
      </View>
    </MainContainer>
  );
};

export default CartPageBuilder;
