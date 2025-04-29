import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },

  photoContainerStyle: {
    width: height * 0.2,
    height: height * 0.2,
    borderRadius: 500,
    marginTop: height * 0.03,
  },

  emptyPgotoContainerStyle: {
    width: height * 0.2,
    height: height * 0.2,
    borderRadius: 500,
    backgroundColor: CustomColors.Gray,
    marginTop: height * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    marginTop: height * 0.04,
    alignItems: "center",
  },
  textStyle: {
    fontSize: 30,
    color: CustomColors.White,
  },
});

export default style;
