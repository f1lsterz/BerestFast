import React from "react";
import { View, Text } from "react-native";
import style from "./style";

interface HeaderComponentProps {
  headerContent?: React.ReactNode; 
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ headerContent }) => {
  return (
    <View style={style.header}>
      {headerContent ? headerContent : <Text>Default Header</Text>}
    </View>
  );
};

export default HeaderComponent;
