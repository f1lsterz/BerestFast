import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./style";

const SignInMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вітаємо Вас у Dely</Text>
      <Text style={styles.text}>Швидка доставка товарів</Text>
      <Text style={styles.text}>Просто, зручно, надійно!</Text>
      <View style = {styles.smallTextContainer}>
        <Text style={styles.smallText}>Введіть номер телефону, щоб увійти</Text>
      </View>
    </View>
  );
};

export default SignInMessage;
