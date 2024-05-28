import React, { useState } from 'react';
import { Text } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../http';
import LoadingOverlay from '../components/LoadingOverlay';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const onSignUp = async ({email, password}) => {
    setIsLoading(true);
    await createUser(email, password);
    setIsLoading(false);
  }
  if (isLoading) {
    return (
      <>
        <LoadingOverlay />
        <Text>Creating user...</Text>
      </>
    ) 
  }
  return <AuthContent onAuthenticate={onSignUp} />;
}

export default SignupScreen;
