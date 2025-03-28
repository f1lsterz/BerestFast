import { StyleSheet } from "react-native";
import { CustomColors } from "common/enum/colors";

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor:CustomColors.Primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor:CustomColors.Primary
  },
});

export default style;
