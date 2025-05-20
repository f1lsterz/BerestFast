import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    marginLeft: width * 0.1,
    marginTop: height * 0.03,
    alignItems: "center",
  },
  textStyle: {
    color: CustomColors.White,
    fontSize: 25,
  },
  deleteButton: {
    marginTop: height * 0.07,
    backgroundColor: CustomColors.White,
    height: height * 0.07,
    width: width * 0.8,
    marginRight: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  deleteButtonText: {
    color: CustomColors.Danger,
    fontSize: 20,
  },
});

export default style;
