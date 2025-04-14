import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  textContainer: {
    marginTop: height * 0.03,
    alignItems: "center",
    height: height * 0.13,
  },
  textAtricleStyle: {
    fontSize: 30,
    color: CustomColors.White,
  },
  descriptionTextContainer: {
    alignItems: "center",
    justifyContent:'space-between',
    marginTop: 20,
    height: height * 0.07,
  },
  descriptionTextStyle: {
    fontSize: 20,
    color: CustomColors.Gray,
  },
});

export default style;
