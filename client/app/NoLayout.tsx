import React, { ReactNode } from "react";
import { View } from "react-native";

type NoLayoutProps = {
  children: ReactNode;
};

function NoLayout({ children }: NoLayoutProps) {
  return <View style={{ height: "100%", width: "100%" }}>{children}</View>;
}

export default NoLayout;
