import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    height: height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
  },

  textArticleStyle: {
    fontSize: 40,
    color: CustomColors.White,
  },
  descriptionText: {
    alignSelf: "flex-start",
    marginLeft: width * 0.03,
    marginTop: 20,
    fontSize: 20,
    color: CustomColors.Gray,
  },
});

export default style;
