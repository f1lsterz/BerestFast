import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  styleArticleText: {
    color: CustomColors.White,
    fontSize: 40,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: height * 0.02,
  },

  textInputContainer: {
    marginLeft: width * 0.03,
    display: "flex",
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.06,
    marginTop: height * 0.04,
    alignItems: "center",
    borderRadius:40,
    borderWidth:1,
    borderColor:CustomColors.White
  },
  textInput: {
    width: width * 0.77,
    height: height * 0.06,
    marginLeft: 5,
    fontSize: 20,
    color: "white",
  },
  iconContainer:{
    marginLeft:15
  }
});

export default style;
