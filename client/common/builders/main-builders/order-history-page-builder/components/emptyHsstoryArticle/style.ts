import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
  },

  container: {
    display: "flex",
    flexDirection: "row",
  },

  textArticleContainer: {
    marginTop:15,
    alignItems: "center",
    justifyContent:'space-around',
    height:height*0.12
  },

  textContainerButton: {
    fontSize: 20,
    color: CustomColors.Yellow,
  },

  textStyle: {
    fontSize: 20,
    color: CustomColors.White,
  },
});

export default style;
