import React, { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../http';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async ({email, password}) => {
    setIsLoading(true);
    try {
      await loginUser(email, password);
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
