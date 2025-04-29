import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerTextStyle: {
    fontSize: 35,
    color: CustomColors.White,
  },
  buttonContainer: {
    height: height * 0.1,
    width: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  svgContainer: {
    alignItems: "center",
    marginTop: height * 0.1,
  },
});

export default style;
