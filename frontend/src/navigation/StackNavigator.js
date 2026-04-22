import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen';
import OnboardingScreen from '../Screens/OnboardingScreen';
import LoginScreen from '../Screens/Login-Screen';
import RegisterScreen from '../Screens/Register-Screen';
import ProductListScreen from '../Screens/ProductListScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import MyCartScreen from '../Screens/MyCartScreen';
import CheckOutScreen from '../Screens/CheckOutScreen';
import CategoryScreen from '../Screens/CategoryScreen';

const Stack = createNativeStackNavigator();

// Auth Stack - Login/Register
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Pre-Auth Stack - Splash/Onboarding/Auth/ProductFlow
// This stack handles the entire unauthenticated flow including shopping before login
export const PreAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      {/* Product flow screens accessible after auth - use same names as TabNavigator for consistency */}
      <Stack.Screen name="ProductListHome" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="MyCart" component={MyCartScreen} />
      <Stack.Screen name="Checkout" component={CheckOutScreen} />
      {/* CategoryScreen as modal overlay */}
      <Stack.Screen 
        name="CategoryScreen" 
        component={CategoryScreen}
        options={{
          presentation: "modal",
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

// Product & Cart Stack - ProductList -> ProductDetails -> Cart -> Checkout
// Used in TabNavigator for authenticated users
export const ProductCartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="MyCart" component={MyCartScreen} />
      <Stack.Screen name="Checkout" component={CheckOutScreen} />
    </Stack.Navigator>
  );
};

