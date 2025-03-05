import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    width: "85%",
    marginTop:"5%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    display:'flex',
    flexDirection:'row'
  },
  textInputStyle: {
    backgroundColor: "white",
    paddingLeft: "10%",
    width: "70%",
    height: "90%",
    borderTopLeftRadius:30,
    borderBottomLeftRadius:30,
    fontSize:20
  },
  agreeButton: {
    backgroundColor: "white",
    width: "29%",
    height:"91%",
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
});

export default style;
