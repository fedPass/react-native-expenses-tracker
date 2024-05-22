import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../constants/styles';

export default function ExpenseItem({expense}: any) {
  const expensePressHandler = () => {
    console.log('pressed an expense');
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
            {expense.date.toLocaleDateString('it-IT')}
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
