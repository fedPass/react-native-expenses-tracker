import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, useColorScheme } from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import ManageExpensesScreen from './screens/ManageExpensesScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import {GlobalStyles} from './constants/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
      }}
      sceneContainerStyle={{
        backgroundColor: GlobalStyles.colors.primary700,
      }}>
      <Tab.Screen
        name="Recent"
        component={RecentExpensesScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="All"
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

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
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Edit" component={ManageExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
