import { createSlice, current } from '@reduxjs/toolkit'

export interface Expense {
  id: string,
  description: string,
  amount: number,
  date: Date
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
      },
      {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
      },
      {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
      },
      {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
      },
      {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2024-05-18')
      }
    ]
  },
  reducers: {
    // addNewExpense: (state, action) => {
      addNewExpense: (state) => {
      state.expenses.push({
        id: 'e'+ (current(state).expenses.length + 1),
        // description: action.payload.expense.description,
        // amount: +action.payload.expense.amount,
        // date: new Date(action.payload.expense.date)
        description: 'Test',
        amount: 5,
        date: new Date('2024-05-22')
      })
    },
    deleteExpense: (state, action) => {
      // console.log('----in slice, delete id', action.payload.id);
      state.expenses.splice(state.expenses.indexOf(action.payload.id), 1)
    },
    updateExpense: (state, action) => {
      // console.log('----in slice, update expense', action.payload.expense);
      state.expenses.map((expense) => {
        // if (expense.id === action.payload.expense.id) {
          if (expense.id === action.payload.id) {
          // return action.payload.expense
          return {
            id: action.payload.id,
            description: 'Test update',
            amount: 10,
            date: new Date('2024-05-22')
          }
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNewExpense, deleteExpense, updateExpense } = expenseSlice.actions

export default expenseSlice.reducer;