import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    width: width*0.25,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "green",
  },
  text: { fontSize: 15 },
});

export default style;
