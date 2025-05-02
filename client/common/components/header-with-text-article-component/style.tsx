import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  headerContainer: {
    height: height * 0.08,
    justifyContent: "space-around",
    alignItems:'center',
    display:'flex',
    flexDirection:'row',
  },
  backbutton: {
    width: width * 0.13,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.07,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});

export default style;
