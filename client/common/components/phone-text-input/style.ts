import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const style = StyleSheet.create({
    textInputContainer: {
        display: "flex",
        flexDirection: "row",
        width: width * 0.9,
        height: height * 0.06,
        marginLeft: width * 0.03,
        alignItems: "center",
        borderWidth:1,
        borderColor:'white',
        borderRadius:40
      },
      iconcontainer:{
        marginLeft:15
      },
      textInput: {
        width: width * 0.77,
        height: height * 0.06,
        marginLeft: 5,
        fontSize: 20,
        color: "white",
      },
})

export default style;