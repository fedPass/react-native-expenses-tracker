import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export default function ExpensesOutput({expenses, expensesPeriod, fallbackText}:any) {
  const content = expenses.length ? <ExpensesList expenses={expenses}/> : <Text style={styles.text}>{fallbackText}</Text>
  return(
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses}/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginBottom: 60
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 32
  }
});