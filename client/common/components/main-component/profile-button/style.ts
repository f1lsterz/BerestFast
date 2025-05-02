import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: width * 0.05,
    width: width * 0.9,
    height: height * 0.06,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: CustomColors.White,
    marginBottom:15
  },
  textStyle: {
    fontSize: 20,
    color: CustomColors.White,
    marginLeft: 20,
  },
  rightArrowContainer: {
    marginRight:20
  },
});

export default style;
