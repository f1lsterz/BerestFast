import { StyleSheet,Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  agreeCodeButton: {
    justifyContent: "center",
    height: height * 0.07,
    alignItems: "center",
    backgroundColor: CustomColors.White,
    width: width * 0.9,
    borderRadius: 40,
    marginTop: 0,
  },
});

export default style;
