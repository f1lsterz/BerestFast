import React from "react";
import { View, Text } from "react-native";
import style from "./style";

interface FooterComponentProps {
  footerContent?: React.ReactNode; 
}

const FooterComponent: React.FC<FooterComponentProps> = ({ footerContent }) => {
  return (
    <View style={style.footer}>
      {footerContent ? footerContent : <Text>Default Footer</Text>}
    </View>
  );
};

export default FooterComponent;
