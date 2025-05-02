import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  buttonsContainer: {
    marginTop: height * 0.03,
  },
  stripe: {
    height: height * 0.001,
    backgroundColor: CustomColors.Gray,
    width: width * 0.9,
    marginLeft: width * 0.05,
    marginBottom: 15,
  },
  logOutButtonContainer: {
    alignItems: "center",
  },
  logOutButton: {
    marginTop: 50,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.05,
    width: width * 0.45,
    backgroundColor: CustomColors.White,
  },
  logOutButtonText: {
    fontSize: 20,
    color: CustomColors.Danger,
  },
  emptyBlock: {
    height: height * 0.2,
    width: width,
  },
});

export default style;
