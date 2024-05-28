import React, { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../http';
import LoadingOverlay from '../components/LoadingOverlay';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const onSignUp = async ({email, password}) => {
    setIsLoading(true);
    try {
      await createUser(email, password);
    } catch (error) {
      Alert.alert('Authentication failed', 'Please check your credentials')
    }
    setIsLoading(false);
  }
  if (isLoading) {
    return <LoadingOverlay />
  }
  return <AuthContent onAuthenticate={onSignUp} />;
}

export default SignupScreen;
