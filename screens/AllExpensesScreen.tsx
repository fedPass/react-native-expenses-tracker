import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/context/expenses-context";

export default function AllExpensesScreen() {
  // const expenses = useSelector(
  //   (state: any) => state.expenses.expenses
  // )
  const expenses = useContext(ExpensesContext).expenses;
  return (
    <ExpensesOutput expenses={expenses} expensesPeriod='Total' fallbackText={'No expenses found'} />
  )
}