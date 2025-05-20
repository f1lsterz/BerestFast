import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  emptyContainer: {
    marginTop:20,
    display: "flex",
    flexDirection: "row",
    width: width ,
    justifyContent: "space-around",
  },

  emptyPgotoContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomColors.Gray,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 500,
  },
});

export default style;
