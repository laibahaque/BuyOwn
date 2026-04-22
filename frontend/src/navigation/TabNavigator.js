import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListScreen from '../Screens/ProductListScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import MyCartScreen from '../Screens/MyCartScreen';
import CheckOutScreen from '../Screens/CheckOutScreen';
import MyOrdersScreen from '../Screens/MyOrdersScreen';
import EditProfile from '../Screens/Edit-Profile';
import ProfileSettings from '../Screens/Profile-Settings';
import GeneralSettings from '../Screens/General-Settings';
import CategoryScreen from '../Screens/CategoryScreen';
import WishlistScreen from '../Screens/WishlistScreen';
import SettingsScreen from '../Screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Products Stack - ProductList -> ProductDetails -> Cart -> Checkout + Category Modal
const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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

// Orders Stack
const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OrdersHome" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack - Profile -> Edit-Profile, Profile-Settings, General-Settings
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHome" component={EditProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
    </Stack.Navigator>
  );
};

// Category Stack
const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CategoryHome" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

// Wishlist Stack
const WishlistStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WishlistHome" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

// Settings Stack
const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Shop" 
        component={ProductsStack}
        options={{
          tabBarLabel: 'Shop',
        }}
      />
      <Tab.Screen 
        name="Category" 
        component={CategoryStack}
        options={{
          tabBarLabel: 'Category',
        }}
      />
      <Tab.Screen 
        name="Wishlist" 
        component={WishlistStack}
        options={{
          tabBarLabel: 'Wishlist',
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersStack}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};