import {useContext, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import IconBtn from '../components/IconBtn';
import CustomButton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  Expense,
  // addNewExpense,
  // deleteExpense,
  // updateExpense,
} from '../store/expenseSlice';
import ExpenseForm from '../components/ExpenseForm';
import {ExpensesContext} from '../store/context/expenses-context';
import { addExpense, deleteExpense, ExpenseData, updateExpense } from '../http';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';
import React from 'react';

// TODO: to check redux implementation

export default function ManageExpensesScreen({route, navigation}: any) {
  const isNewAdding = route.params?.isNew;
  const expenseId = route.params?.expenseId;
  // const expenses: Expense[] = useSelector(
  //   (state: any) => state.expenses.expenses
  // );
  // const expense = expenseId ? expenses.filter((expense:Expense) => expense.id === expenseId)[0] : {
  //   id: '',
  //   description: '',
  //   amount: '',
  //   date: ''
  // };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const expensesCtx = useContext(ExpensesContext);
  const selectedExpense = expensesCtx.expenses.find(
    (expense: Expense) => expense.id === expenseId,
  );
  // const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      // !!variable/condition -> convert in boolean
      title: isNewAdding ? 'Add new expense' : 'Manage expense',
    });
  }, [navigation]);

  const deleteHandler = async () => {
    // dispatch(deleteExpense({id: expenseId}));
    setIsSubmitted(true); //setIsSubmitted(false); is not required because we use goBack()
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (e) {
      setError('Error to delete expence. Please retry!');
      setIsSubmitted(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  // to save correct id we need to await response from post call and pass new id to the addExpense of the context
  const confirmHandler = async (expenseData: ExpenseData) => {
    setIsSubmitted(true);
    // isNewAdding ? dispatch(addNewExpense({expense})) : dispatch(updateExpense({expense}));
    // isNewAdding ? dispatch(addNewExpense()) : dispatch(updateExpense({id: expenseId}));
    try {
      if (expenseId) {
          await updateExpense(expenseId, expenseData)
          expensesCtx.updateExpense(expenseId, expenseData);
      } else {
          const id = await addExpense(expenseData);
          expensesCtx.addExpense({...expenseData, id});
      }
      navigation.goBack();
    } catch (error) {
      setError(`Problem to ${expenseId? 'update' : 'add new'} expense. Please retry`);
      setIsSubmitted(false);
    }


  };

  if (error.length && !isSubmitted) {
    return <ErrorOverlay message={error} onConfirm={() => setError('')}/>
  }

  if (isSubmitted) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      <View>
        {!isNewAdding && (
          <View style={styles.deleteBtn}>
            <IconBtn
              name="delete"
              size={24}
              onPress={deleteHandler}
              color={GlobalStyles.colors.error500}
              bkgColor={GlobalStyles.colors.primary400}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    marginHorizontal: GlobalStyles.margin.marginHorizontal,
  },
  deleteBtn: {
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary100,
    marginTop: 16,
    padding: 8,
    alignItems: 'center',
  },
});
