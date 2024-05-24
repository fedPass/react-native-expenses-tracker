import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import { useNavigation } from '@react-navigation/native';

export default function ExpenseItem({expense}: any) {
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate('Edit', {expenseId: expense.id});
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.textDescription, , styles.text]}>
            {expense.description}
          </Text>
          <Text style={styles.text}>
            {expense.date.toISOString().slice(0, 10)}
          </Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{expense.amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: GlobalStyles.margin.marginHorizontal,
    marginTop: 12,
    backgroundColor: GlobalStyles.colors.primary400,
    padding: 8,
    borderRadius: GlobalStyles.borderRadius.borderRadiusBig,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  textDescription: {
    fontWeight: 'bold',
  },
  amountBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: GlobalStyles.borderRadius.borderRadiusSmall,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    color: GlobalStyles.colors.primary800,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
