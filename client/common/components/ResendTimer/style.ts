import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  descriptionText: {
    alignSelf: "flex-start",
    marginLeft: width * 0.03,
    fontSize: 20,
    color: CustomColors.Gray,
  },
});

export default style;
