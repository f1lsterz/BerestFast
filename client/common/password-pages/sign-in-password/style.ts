import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "common/enum/colors"; 

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    height: height * 0.4,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textArticleStyle: {
    fontSize: 40,
    color: Colors.White,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    width: width * 0.9,
    height: height * 0.06,
    alignItems: "center",
  },
  textInput: {
    width: width * 0.77,
    height: height * 0.06,
    marginLeft: 5,
    fontSize: 20,
    color: "white",
  },
  forgotTextStyle: {
    marginTop: 10,
    marginLeft: width * 0.03,
    fontSize: 20,
    color: Colors.Yellow,
  },
  singInButton: {
    justifyContent: "center",
    height: height * 0.07,
    alignItems: "center",
    backgroundColor: Colors.White,
    width: width * 0.9,
    borderRadius:40
  },
  registerButton:{
    display:'flex',
    flexDirection:'row',
    marginTop:height * 0.04,
  },
  textStyle:{
    fontSize:15,
    color:Colors.White
  },
  registrationTextStyle:{
    fontSize:15,
    color:Colors.Yellow
  },

  descriptionText: {
    alignSelf:"flex-start",
    marginLeft: width * 0.03,
    fontSize: 20,
    color: Colors.Gray,
  },

});

export default style;
