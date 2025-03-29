import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainComntainer: {
    alignItems: "center",
  },
  textArticleStyle: {
    fontSize: 40,
    color: CustomColors.White,
  },
  passwordInputContainer: {
    marginTop: 20,
  },
  continueButtonContainer: {
    marginTop: height * 0.05,
  },

  passwordError:{
    fontSize:20,
    color:CustomColors.Yellow
  }

});

export default style;
