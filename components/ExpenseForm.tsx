import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { Expense } from '../store/expenseSlice';
import { useState } from 'react';
import CustomButton from './CustomButton';

export default function ExpenseForm({expense, expenseId, onCancel, onSubmit}: any) {
  const [enteredExpense, setEnteredExpense] = useState({
    description: '',
    amount: '',
    date:''
  })
  const onChangeInput = (inputIdentifier:string, enteredText:string) => {
    setEnteredExpense((currValues) => {
      return {
        ...currValues,
        [inputIdentifier]: enteredText
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      description: enteredExpense.description,
      amount: +enteredExpense.amount,
      date: new Date(enteredExpense.date)
    }
    onSubmit((expenseData))
  }
  return (
    <View>
      <Text>{expenseId}</Text>
      <Text style={styles.title}>Your expense</Text>
      {/* <Text>Description: {expense.description}</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput.bind(this, 'description')}
        value={expense ? expense.description : enteredExpense.description}
        placeholder="Description"
        multiline={true}
      />
      {/* <Text>amount: {expense.amount}</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput.bind(this, 'amount')}
        value={expense ? expense.amount : enteredExpense.amount}
        placeholder="Amount"
        keyboardType="decimal-pad"
      />
      {/* <Text>date: {expense.date.toString()}</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput.bind(this, 'date')}
        value={expense ? expense.date : enteredExpense.date}
        placeholder="YYYY-MM-DD"
        maxLength={10}
      />
      <View style={styles.customBtnContainer}>
        <CustomButton
          style={styles.button}
          mode="flat"
          onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={submitHandler}>
          {expenseId ? 'Update' : 'Add'}
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    marginVertical: 8,
    borderRadius: GlobalStyles.borderRadius.borderRadiusSmall,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  },
  customBtnContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 12,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});