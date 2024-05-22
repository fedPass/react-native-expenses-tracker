import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function ExpensesSummary({periodName, expenses}:any) {
  const expensesSum = expenses.reduce((sum: number, expense: any) => {
    return sum + expense.amount
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.total}>{expensesSum.toFixed(2)}€</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: GlobalStyles.margin.marginHorizontal,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: GlobalStyles.borderRadius.borderRadiusBig,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  period: {
    color: GlobalStyles.colors.primary800
  },
  total: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
    fontSize: 18
  }
});