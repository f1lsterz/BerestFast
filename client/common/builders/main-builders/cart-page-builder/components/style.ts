import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent:"space-around",
    marginTop: 30,
    height:height*0.15
  },
  containerCatalogButton: {
    display: "flex",
    flexDirection: "row",
  },
  buttonTextStyle:{
    fontSize:25,
    color:CustomColors.Yellow
  },
  textDefStyle:{
    fontSize:25,
    color:CustomColors.White
  }
});

export default style;
