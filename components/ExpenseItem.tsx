import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function ExpenseItem({expense}: any) {
  console.log('---', expense);
  return (
    <View>
      <Text>Ciao</Text>
      {/* <Text>{expense.description}</Text>
      <Text>{expense.amount}</Text>
      <Text>{expense.date}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
  borderWidth: 1,
  backgroundColor: GlobalStyles.colors.primary50
 }
});