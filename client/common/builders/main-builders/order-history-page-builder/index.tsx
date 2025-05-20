import React from "react";
import { View, Text } from "react-native";
import style from "./style";
import MainContainerWithHeader from "common/components/main-component/main-container-with-header";
import EmptyHistoryArticle from "./components/emptyHsstoryArticle";
import useOrderArchiveStore from "services/storage/archive-storage";

const OrderHistoryPageBuilder = () => {
  const items = useOrderArchiveStore((state) => state.items);

  return (
    <MainContainerWithHeader text="Архів замовлень">
      <View>
        {items.length === 0 ? (
          <EmptyHistoryArticle />
        ) : (
          items.map((item, index) => (
            <View key={index} >
              <Text >{item.name}</Text>
            </View>
          ))
        )}
      </View>
    </MainContainerWithHeader>
  );
};

export default OrderHistoryPageBuilder;
