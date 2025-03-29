import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");
const style = StyleSheet.create({
  mainContainer: {
    height: height * 0.45,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textArticleStyle: {
    fontSize: 40,
    color: CustomColors.White,
  },
  descriptionText: {
    alignSelf: "flex-start",
    marginTop:20,
    marginLeft: width * 0.03,
    fontSize: 20,
    color: CustomColors.Gray,
  },
  textArticleContainer: {
    alignItems: "center",
  },
  continueButtonContainer: {
    marginTop: height * 0.05,
  },
});

export default style;
