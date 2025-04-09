import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    width: width,
    justifyContent:'space-around',
    height:height*0.45,
  },
  textStyle: {
    fontSize: 40,
    color: CustomColors.White,
  },
  descriptionText: {
    marginLeft: width * 0.055,
    marginTop: 20,
    marginBottom: 20,
    alignSelf:'flex-start',
    fontSize: 20,
    color: CustomColors.Gray,
  },
  continueButtonContainer:{
    marginTop: height* 0.05,
  }
});

export default style;
