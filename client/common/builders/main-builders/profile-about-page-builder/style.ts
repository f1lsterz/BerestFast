import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    marginLeft: width * 0.1,
    marginTop: height * 0.03,
  },
  textStyle: {
    color: CustomColors.White,
    fontSize: 25,
  },
});

export default style;
