import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  forgotTextStyle: {
    marginTop: 10,
    marginLeft: width * 0.03,
    fontSize: 20,
    color: CustomColors.Yellow,
  },
});

export default style;
