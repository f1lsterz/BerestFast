import React from "react";
import MainContainerForMain from "common/components/main-component/main-container";
import OrderPageBuilder from "common/builders/main-builders/order-builder";

const OrderPage = () => {
  return (
    <MainContainerForMain>
      <OrderPageBuilder />
    </MainContainerForMain>
  );
};

export default OrderPage;
