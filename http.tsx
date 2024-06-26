import axios from 'axios';
import { Expense } from './store/expenseSlice';
import { FIRE_BASE_API_KEY } from '@env';

const baseUrl = 'https://expense-tracker-rn-d4938-default-rtdb.firebaseio.com/';
const baseGoogleAPI = 'https://identitytoolkit.googleapis.com/v1/';
// to access firebase restricted resource add to url -> ?auth=<token>

export interface ExpenseData {
  description: string;
  amount: number;
  date: Date
}

export async function addExpense(expenseData: ExpenseData) {
  // we need the id to save it on store
  const response = await axios.post(baseUrl+'expenses.json', expenseData);
  // this is prop in which firebase save the id
  const id = response.data.name;
  return id;
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

export function updateExpense(id: number, expenseData: ExpenseData) {
  return axios.put(baseUrl+`/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id: number) {
  return axios.delete(baseUrl+`/expenses/${id}.json`);
}

export async function authenticate(mode:string, email:string, password: string) {
  const url = `${baseGoogleAPI}accounts:${mode}?key=${FIRE_BASE_API_KEY}`;
  const response = await axios.post(url, {email, password, returnSecureToken: true});
  const token = response.data.idToken;
  return token;
}

export function createUser(email: string, password: string) {
  return authenticate('signUp', email, password);
}

export function loginUser(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}