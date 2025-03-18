import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@client/common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  styleArticleText: {
    color: Colors.Yellow || "#FFC618",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderRadius: 8,
    width: width * 0.9,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
});

export default style;
