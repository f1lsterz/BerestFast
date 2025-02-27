import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  SingUpButton: {
    borderWidth: 2,
    height: "25%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: "10%",
    borderColor:"#B02700"
  },

  SingInButton: {
    backgroundColor: "red",
    height: "25%",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginTop: "5%",
  },

  SingInButtonText: {
    fontSize: 20,
    color: "white",
  },

  SingUpButtonText: {
    fontSize: 20,
    color: "red",
  },

  textStyle: {
    fontSize: 30,
    marginTop: "5%",
  },
});

export default style;
