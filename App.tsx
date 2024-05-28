import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import ManageExpensesScreen from './screens/ManageExpensesScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import {GlobalStyles} from './constants/styles';
import IconBtn from './components/IconBtn';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ExpensesContextProvider from './store/context/expenses-context';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AuthContextProvider, { AuthContext } from './store/context/auth-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const authCtx = useContext(AuthContext);

  return (
    // screenOptions can receive an obj or a funct. 
    // If use function like arg can destructure and intercept navigation to use it on press btn
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        // headerShown: false,
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        headerRight: ({tintColor}) => (
          <View style={{flexDirection: 'row'}}>
            <IconBtn
              name="plus"
              onPress={() => {navigation.navigate('Edit', {isNew: true})}}
              size={24}
              color={tintColor}
            />
            <IconBtn
              name="logout"
              onPress={authCtx.logout}
              size={24}
              color={tintColor}
            />
          </View>
          
        ),
      })}
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

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={TabNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Edit" component={ManageExpensesScreen} options={{
      title: 'Manage expense',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      contentStyle: {backgroundColor: GlobalStyles.colors.primary400},
      presentation: 'modal'
    }}/>
    </Stack.Navigator>
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <>       
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack /> }
      </NavigationContainer>
    </>
  );
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
      <AuthContextProvider>
        {/* <Provider store={store}> */}
        <ExpensesContextProvider>        
          <Navigation />
        </ExpensesContextProvider>
        {/* </Provider> */}
      </AuthContextProvider>
    </>
  );
}

export default App;
