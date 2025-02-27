import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: "#1374E2",
    height: "15%",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },


  mainPart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "60%",
  },

  footer: {
    height: "25%",
    alignItems: "center",
    backgroundColor: "#1374E2",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },



});

export default Style;
