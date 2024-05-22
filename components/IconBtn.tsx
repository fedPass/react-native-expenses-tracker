import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { GlobalStyles } from "../constants/styles";

export default function IconBtn({name, onPress, size, color}:any) {
  return(
    <Pressable>
      <Icon.Button
        name={name}
        backgroundColor={GlobalStyles.colors.primary500}
        size={size}
        color={color}
        onPress={onPress}
      >
      </Icon.Button>
    </Pressable>
  )
}