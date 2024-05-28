import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../http';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';
import { AuthContext } from '../store/context/auth-context';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const onLogin = async ({email, password}) => {
    setIsLoading(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed', 'Please check your credentials')
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay /> 
  }

  return <AuthContent isLogin onAuthenticate={onLogin} />;
}

export default LoginScreen;
