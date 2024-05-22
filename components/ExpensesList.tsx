import {FlatList, Text} from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({expenses}: any) {
  return (
    <FlatList
      data={expenses}
      renderItem={item => 
      // <ExpenseItem expense={item.item} />
      <Text>{item.item.description}</Text>
      }
      keyExtractor={item => item.id}
    />
  );
}
