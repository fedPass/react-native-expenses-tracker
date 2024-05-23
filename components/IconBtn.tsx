import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { GlobalStyles } from "../constants/styles";

export default function IconBtn({name, onPress, size, color, bkgColor}:any) {
  return(
    <Pressable>
      <Icon.Button
        name={name}
        backgroundColor={bkgColor ?? GlobalStyles.colors.primary500}
        size={size}
        color={color}
        onPress={onPress}
      >
      </Icon.Button>
    </Pressable>
  )
}