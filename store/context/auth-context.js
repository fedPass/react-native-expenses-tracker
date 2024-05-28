import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  //   authenticate method to trigger whenever a user did authenticate successfully
  authenticate: (token) => {},
  //   logout method which should clear the authentication status.
  logout: () => {}
})

export default function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();

  // REMINDER: depends on backend token could expire
  // firebase token expires after 1h to we can:
  // A. logout user after 1h
  // B. refresh token with setTimeout()
  // https://firebase.google.com/docs/reference/rest/auth?hl=it#section-refresh-token

  //use useEffect here to run this code when app is initialized (provider wraps the app component)
  useEffect(() => {
    // getItem returns a promise so we need to use sync/await with helper function 
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setAuthToken(storedToken);
      }
    }
    fetchToken();
  }, [])

  function authenticate(token) {
    setAuthToken(token);
    // use asyncstorage to save token on device
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}