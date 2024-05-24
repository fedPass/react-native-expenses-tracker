import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { Expense } from '../store/expenseSlice';
import { useState } from 'react';
import CustomButton from './CustomButton';

export default function ExpenseForm({onCancel, onSubmit, defaultValues}: any) {
  const [enteredExpense, setEnteredExpense] = useState({
    description: defaultValues ? defaultValues.description : '',
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date:defaultValues ? defaultValues.date.toLocaleDateString('it-IT') : ''
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
      // TODO if is an update check date format before made new Date() because i show in it format
      date: new Date(enteredExpense.date)
    }
    //validation
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length;

    if (isAmountValid && isDateValid && isDescriptionValid) {
      onSubmit((expenseData))
    } else {
      Alert.alert('Input invalid','Please check your input values')
    }

  }
  return (
    <View>
      <Text style={styles.title}>Your expense</Text>
      {/* <Text>Description: {expense.description}</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput.bind(this, 'description')}
        value={enteredExpense.description}
        placeholder="Description"
        multiline={true}
      />
      {/* <Text>amount: {expense.amount}</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput.bind(this, 'amount')}
        value={enteredExpense.amount}
        placeholder="Amount"
        keyboardType="decimal-pad"
      />
      {/* <Text>date: {expense.date.toString()}</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput.bind(this, 'date')}
        value={enteredExpense.date}
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
          {defaultValues ? 'Update' : 'Add'}
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