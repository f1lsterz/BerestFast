import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  headerContainer: {
    height: height * 0.08,
    justifyContent: "center",
  },
  backbutton: {
    width:width*0.13,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:15,
    height: height * 0.07,
  },
});

export default style;
