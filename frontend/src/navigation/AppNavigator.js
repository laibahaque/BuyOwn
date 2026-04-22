import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PreAuthStack } from './StackNavigator';
import { TabNavigator } from './TabNavigator';

const AppNavigator = () => {
  // TODO: Connect to AuthContext to determine if user is authenticated
  // For now, using local state - replace with context when ready
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // TODO: Check authentication status from AuthContext or AsyncStorage
    // This will determine whether to show PreAuthStack or TabNavigator
    // Example:
    // const checkAuth = async () => {
    //   const userToken = await AsyncStorage.getItem('userToken');
    //   setIsAuthenticated(!!userToken);
    //   setIsAppReady(true);
    // };
    // checkAuth();
    setIsAppReady(true);
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <PreAuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;