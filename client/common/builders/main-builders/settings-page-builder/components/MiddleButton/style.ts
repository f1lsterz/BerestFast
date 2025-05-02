import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  buttonWrapper: {
    height: height * 0.05,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom:3
  },
  buttonBackground: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: CustomColors.Gray,
    borderRadius: 0,
    opacity: 0.3,
  },
  buttonText: {
    marginLeft: width * 0.1,
    fontSize: 20,
    color: CustomColors.White, 
  },
});

export default style;
