import {useSelector} from 'react-redux';
import ExpensesOutput from '../components/ExpensesOutput';
import {Expense} from '../store/expenseSlice';
import {useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../store/context/expenses-context';
import {getExpenses} from '../http';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

export default function RecentExpensesScreen({navigation}: any) {
  // const expenses = useSelector(
  //   (state: any) => state.expenses.expenses
  // )

  //state used to show loader while fetching data
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const expensesCtx = useContext(ExpensesContext);

  // getExpenses return a promise, so to wait response we use this wordaround:
  // declare an async helper funct with getExpenses inside, and then calll this helper funct with await

  // we add a new method to the context to set our expenses: when add a new expense we send it to backend and save it on store,
  // so we already add olr expense and we don't need to call data again
  useEffect(() => {
    async function fetchExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Problem to fetch data');
      }
      setIsFetching(false);
    }
    fetchExpenses();
  }, []);

  if (error.length && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={() => setError('')}/>
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense: Expense) => {
    const today = new Date();
    const sevenDayAgo = new Date();
    sevenDayAgo.setDate(today.getDate() - 7);
    return expense.date >= sevenDayAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText={'No expenses in last 7 days'}
    />
  );
}
