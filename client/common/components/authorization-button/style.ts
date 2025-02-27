import { StyleSheet,Dimensions } from "react-native";

const { height } = Dimensions.get('window');

const style = StyleSheet.create({
    buttonStyle:{
        width:"70%",
        height:height*0.05,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
        borderWidth:2,
        borderColor:'#B02700'
    }
})

export default style;