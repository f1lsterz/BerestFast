import React from "react";
import { View, TextInput } from "react-native";
import UserIcon from "common/svg/user-icon";
import style from "./style";
import { ProfileTextInputProps } from "common/interface/ProfileTextInput";

const ProfileTextInput: React.FC<ProfileTextInputProps> = ({
  name,
  setName,
}) => {
  return (
    <View style={style.textInputContainer}>
      <View style={style.iconContainer}>
        <UserIcon />
      </View>
      <TextInput
        style={style.textInput}
        placeholder="Введіть ваше ім'я"
        placeholderTextColor="white"
        value={name}
        onChangeText={setName}
        autoFocus={true}
      />
    </View>
  );
};

export default ProfileTextInput;
