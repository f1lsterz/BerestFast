import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { CustomColors } from "common/enum/colors";
import { CustomButtonProps } from "./model";
import style from "./style";

const CustomButton: React.FC<CustomButtonProps> = ({
  selected,
  color,
  unselectedColor,
  text,
  pressHandle,
  Svg,
}) => {
  return (
    <TouchableOpacity style={style.container} onPress={pressHandle}>
      <Svg />
      <Text
        style={[
          style.text,
          {
            color: selected
              ? CustomColors[color]
              : CustomColors[unselectedColor],
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
