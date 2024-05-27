import axios from 'axios';
import { Expense } from './store/expenseSlice';

const baseUrl = 'https://expense-tracker-rn-d4938-default-rtdb.firebaseio.com/';

export function addExpense(expenseData: {description: string, amount: number, date: Date}) {
  axios.post(baseUrl+'expenses.json', expenseData);
}

export async function getExpenses() {
  const response = await axios.get(baseUrl+'expenses.json');
  //fix firebase db structure response (id in the key of the obj)
  const expenses: Expense[]= [];
  for (const key in response.data) {
    const expenseObj: Expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }
    expenses.push(expenseObj);
  }
  return expenses;
}