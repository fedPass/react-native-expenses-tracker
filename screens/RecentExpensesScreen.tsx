import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput";
import { Expense } from "../store/expenseSlice";
import { useContext } from "react";
import { ExpensesContext } from "../store/context/expenses-context";

export default function RecentExpensesScreen() {
  // const expenses = useSelector(
  //   (state: any) => state.expenses.expenses
  // )

  const expenses = useContext(ExpensesContext).expenses;

  const recentExpenses = expenses.filter((expense:Expense) => {
    const today = new Date();
    const sevenDayAgo= new Date();
    sevenDayAgo.setDate(today.getDate() - 7);
    return expense.date >= sevenDayAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 days' fallbackText={'No expenses in last 7 days'} />
  )
}