import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  aboutinformationTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: CustomColors.White,
    width: width * 0.8,
    height: height * 0.06,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
  },

  textContainer: {
    width: width * 0.55,
  },

  aboutinformationText: {
    color: CustomColors.White,
    fontSize: 20,
  },

  aboutText: {
    color: CustomColors.White,
    fontSize: 20,
    paddingLeft:20
  },

  containerNotButton: {
    marginTop: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: CustomColors.White,
    width: width * 0.8,
    height: height * 0.06,
    justifyContent: "center",
    marginBottom: 15,
  },
});

export default style;
