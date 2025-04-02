import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: height * 0.02,
  },
  styleArticleText: {
    color: CustomColors.White,
    fontSize: 40,
  },
  continueButton: {
    marginTop: height * 0.13,
  },
});

export default style;
