import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "common/enum/colors";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    height: "100%",
  },

  containeListOfButtons: {
    marginTop: 15,
  },

  textArticleToListOfButtons: {
    color: CustomColors.White,
    fontSize:25,
    marginBottom:width * 0.05,
  },

  listOfButtons: {
    width: width * 0.9,
  },

  buttonFromList: {
    backgroundColor: CustomColors.White,
    height: height * 0.05,
    justifyContent: "center",
  },

  buttonTopEgdeFromList: {
    backgroundColor: CustomColors.White,
    height: height * 0.05,
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  buttonBottomEgdeFromList: {
    backgroundColor: CustomColors.White,
    justifyContent: "center",
    height: height * 0.05,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  buttonTextStyle: {
    marginLeft: width * 0.1,
    fontSize: 20,
  },

  logOutButtonContainer: {
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

  buttonContainers: {},
});

export default style;
