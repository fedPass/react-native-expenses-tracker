import {FlatList, Text} from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({expenses}: any) {
  return (
    // it's possible to use <ExpenseItem {...item.item} /> to pass all item.item props at child component
    <FlatList
      data={expenses}
      renderItem={item => <ExpenseItem expense={item.item} /> }
      keyExtractor={item => item.id}
    />
  );
}
