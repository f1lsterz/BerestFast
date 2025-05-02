import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  centralPart: {
    flexGrow: 1 ,
    marginTop: height * 0.05,
    backgroundColor: CustomColors.DarkBlue,
    width: width,
    borderRadius: 30,
    height: height * 0.75,
  },
  textStyle: {
    fontSize: 30,
    color: CustomColors.White,
    marginLeft: width * 0.1,
    marginTop: width * 0.1,
  },

});

export default style;
