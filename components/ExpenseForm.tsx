import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { useState } from 'react';
import CustomButton from './CustomButton';

export default function ExpenseForm({onCancel, onSubmit, defaultValues}: any) {
  const [enteredExpense, setEnteredExpense] = useState({
    description: {
      value: defaultValues ? defaultValues.description : '',
      // set initial isValid on true (but it's not real because is empty) to not show error message
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date:{
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: true,
    }
  })
  const onChangeInput = (inputIdentifier:string, enteredText:string) => {
    setEnteredExpense((currValues) => {
      return {
        ...currValues,
        [inputIdentifier]: { value: enteredText, isValid: true }
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      description: enteredExpense.description.value,
      amount: +enteredExpense.amount.value,
      // TODO if is an update check date format before made new Date() because i show in it format
      date: new Date(enteredExpense.date.value)
    }
    //validation
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length;

    if (isAmountValid && isDateValid && isDescriptionValid) {
      onSubmit((expenseData))
    } else {
      // Alert.alert('Input invalid','Please check your input values')
      setEnteredExpense((curInputs) => {
        return {
          description: {
            value: curInputs.description.value,
            isValid: isDescriptionValid,
          },
          amount: { value: curInputs.amount.value, isValid: isAmountValid },
          date: { value: curInputs.date.value, isValid: isDateValid },
        };
      });
    }
  }

  const isFormInvalid =
  !enteredExpense.amount.isValid ||
  !enteredExpense.date.isValid ||
  !enteredExpense.description.isValid;

  return (
    <View>
      <Text style={styles.title}>Your expense</Text>
      {/* <Text>Description: {expense.description}</Text> */}
      <TextInput
        style={[styles.input, !enteredExpense.description.isValid && styles.inputError]}
        onChangeText={onChangeInput.bind(this, 'description')}
        value={enteredExpense.description.value}
        placeholder="Description"
        multiline={true}
      />
      {/* <Text>amount: {expense.amount}</Text> */}
      <TextInput
        style={[styles.input, !enteredExpense.amount.isValid && styles.inputError]}
        onChangeText={onChangeInput.bind(this, 'amount')}
        value={enteredExpense.amount.value}
        placeholder="Amount"
        keyboardType="decimal-pad"
      />
      {/* <Text>date: {expense.date.toString()}</Text> */}
      <TextInput
        style={[styles.input, !enteredExpense.date.isValid && styles.inputError]}
        onChangeText={onChangeInput.bind(this, 'date')}
        value={enteredExpense.date.value}
        placeholder="YYYY-MM-DD"
        maxLength={10}
      />
      {isFormInvalid && (
        <View style={styles.errorTextBox}>
          <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
        </View>
      )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: 'bold'
  },
  inputError: {
    backgroundColor: GlobalStyles.colors.error50
  },
  errorTextBox: {
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: GlobalStyles.borderRadius.borderRadiusSmall,
  }
});