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
  textNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.6,
    height: height * 0.06,
  },
  textPhoneNumberContainer: {
    display: "flex",
    width: width * 0.6,
    flexDirection: "row",
    height: height * 0.06,
    alignItems: "center",
  },
  textStyle: {
    fontSize: 25,
    color: CustomColors.White,
    marginLeft: 15,
  },
});

export default style;
