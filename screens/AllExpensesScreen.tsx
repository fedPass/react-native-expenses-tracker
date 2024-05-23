import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput";

export default function AllExpensesScreen() {
  const expenses = useSelector(
    (state: any) => state.expenses.expenses
  )
  return (
    <ExpensesOutput expenses={expenses} expensesPeriod='Total' />
  )
}