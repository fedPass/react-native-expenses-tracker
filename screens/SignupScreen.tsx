import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../http';
import LoadingOverlay from '../components/LoadingOverlay';
import { AuthContext } from '../store/context/auth-context';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const onSignUp = async ({email, password}) => {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
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
