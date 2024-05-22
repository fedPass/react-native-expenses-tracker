import { Text, View } from "react-native";

export default function ExpensesSummary({periodName, expenses}:any) {
  const expensesSum = expenses.reduce((sum: number, expense: any) => {
    return sum + expense.amount
  }, 0);
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>{expensesSum.toFixed(2)}€</Text>
    </View>
  )
}