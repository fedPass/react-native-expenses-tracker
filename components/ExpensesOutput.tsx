import { StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export default function ExpensesOutput({expenses, expensesPeriod}:any) {
  return(
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses}/>
      <ExpensesList expenses={expenses}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24
  }
});