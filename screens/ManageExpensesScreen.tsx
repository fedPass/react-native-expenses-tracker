import {useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import IconBtn from '../components/IconBtn';
import CustomButton from '../components/CustomButton';

export default function ManageExpensesScreen({
  expense,
  route,
  navigation,
}: any) {
  const isNewAdding = route.params?.isNew;
  useLayoutEffect(() => {
    navigation.setOptions({
      // !!variable/condition -> convert in boolean
      title: isNewAdding ? 'Add new expense' : 'Manage expense',
    });
  }, [navigation]);

  const onChangeDescription = (enteredText: string) => {
    console.log('change descrip', enteredText);
  };
  const onChangeAmount = (enteredText: string) => {
    console.log('change amount', enteredText);
  };
  const onChangeDate = (enteredText: string) => {
    console.log('change date', enteredText);
  };

  const deleteHandler = () => { 
    navigation.goBack();
  }
  const cancelHandler = () => { 
    navigation.goBack();
  }
  const confirmHandler = () => { 
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDescription}
          // value={expense ? expense.description : enteredDescript}
          placeholder="Description"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          // value={expense ? expense.amount : enteredAmount}
          placeholder="Amount"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeDate}
          // value={expense ? expense.date : enteredDate}
          placeholder="Date"
          // keyboardType="numeric"
        />
      </View>
      <View>
        <View style={styles.customBtnContainer}>
          <CustomButton
            style={styles.button}
            mode="flat"
            onPress={cancelHandler}>
            Cancel
          </CustomButton>
          <CustomButton
            style={styles.button}
            onPress={confirmHandler}>
            {!isNewAdding ? 'Update' : 'Add'}
          </CustomButton>
        </View>
        <View style={styles.deleteBtn}>
          {!isNewAdding && (
            <IconBtn
              name="delete"
              size={24}
              onPress={deleteHandler}
              color={GlobalStyles.colors.error500}
              bkgColor={GlobalStyles.colors.primary400}
            />
          )}
        </View>
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
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    marginVertical: 8,
    borderRadius: GlobalStyles.borderRadius.borderRadiusSmall,
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
  deleteBtn: {
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary100,
    marginTop: 16,
    padding: 8,
    alignItems: 'center'
  }
});
