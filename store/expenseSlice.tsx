import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Expense {
  id: string,
  description: string,
  amount: number,
  date: Date | null
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [
      {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
      }
    ]
  },
  reducers: {
    // addNewExpense: (state, action: PayloadAction<Expense>) => {
      addNewExpense: (state, action) => {
      state.expenses.push(action.payload.expense)
    },
    // deleteExpense: (state, action: PayloadAction<Expense>) => {
      deleteExpense: (state, action) => {
      state.expenses.splice(state.expenses.indexOf(action.payload.expense.id), 1)
    },
    updateExpense: (state, action) => {
      state.expenses.map((expense) => {
        if (expense.id === action.payload.expense.id) {
          return action.payload.expense
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNewExpense, deleteExpense, updateExpense } = expenseSlice.actions

export default expenseSlice.reducer;