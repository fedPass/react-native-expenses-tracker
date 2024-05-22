import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import ManageExpensesScreen from './screens/ManageExpensesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#ECEA56',
      tabBarInactiveTintColor: '#D1D0C6',
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: '#0B3469'
      }
    }}
    sceneContainerStyle= {{
      backgroundColor: "#1552A1"
    }}>
      <Tab.Screen name='All' component={AllExpensesScreen} options={{
        tabBarIcon: ({color, size}) => <Icon name="list" color={color} size={size} />
      }}></Tab.Screen>
      <Tab.Screen name='Recent' component={RecentExpensesScreen} options={{
        tabBarIcon: ({color, size}) => <Icon name="star" color={color} size={size} />
      }}></Tab.Screen>
    </Tab.Navigator>
  )
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={TabNavigator} options={{headerShown: false}}/>
          <Stack.Screen name='Edit' component={ManageExpensesScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});

export default App;
