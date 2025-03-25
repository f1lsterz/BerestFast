import React, { useState } from "react";
import MainContainer from "../main-container";
import { View, Text, TextInput,TouchableOpacity } from "react-native";
import style from "./style";
import UserIcon from "common/svg/user-icon";

const AuthProfileRegPage = () => {
  const [name, setName] = useState(""); 

  return (
    <MainContainer>
      <View style={style.textContainer}>
        <Text style={style.styleArticleText}>Введіть ваше ім'я</Text>
        <View style={style.textInputContainer}>
          <UserIcon />
          <TextInput
            style={style.textInput}
            placeholder="Введіть ваше ім'я"
            placeholderTextColor="white"
            value={name} 
            onChangeText={setName}
            autoFocus={true} 
          />
        </View>
        <TouchableOpacity
            style={style.agreeCodeButton}
          >
            <Text style={{ fontSize: 20 }}>Зареєстуватися</Text>
          </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

export default AuthProfileRegPage;
