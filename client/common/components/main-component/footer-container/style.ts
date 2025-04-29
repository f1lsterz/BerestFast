import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    height: height*0.15,
    width: "100%",
    // backgroundColor: "black",
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
});

export default style;
