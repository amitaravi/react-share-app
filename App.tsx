import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';

import AddProduct from './screens/AddProduct';
import UserProducts from './screens/UserProducts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Create Account' }} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Add Product' }} />
        <Stack.Screen name="MyProducts" component={UserProducts} options={{ title: 'My Products' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
