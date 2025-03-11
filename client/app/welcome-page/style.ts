import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
  buttonListContainer:{
    alignItems:'center',
    height:height*0.17
  },
  signInButton:{
    backgroundColor:'white',
    height:height*0.07,
    width:width*0.8,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
  },

  signUpButton:{
    backgroundColor:'white',
    height:height*0.07,
    width:width*0.8,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
    marginTop:"5%"
  }

});

export default style;
