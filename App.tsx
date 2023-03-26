import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./screens/Login";
import Register from './screens/Register';
import LandingPage from './screens/LandingPage';
import AddProduct from './screens/AddProduct';
import UserProducts from './screens/UserProducts';
import SearchResults from './screens/SearchResults';
import SearchProducts from './screens/SearchProducts';
import ProductDescription from './screens/ProductDescription';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from './src/consts/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Favorites from './screens/Favorites';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Add Product' }} />
        <Stack.Screen name="MyProducts" component={UserProducts} options={{ title: 'My Products' }} />
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ title: 'Landing Page' }} />
        <Stack.Screen name="SearchResults" component={SearchResults} options={{ title: 'Search Results' }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
        <Stack.Screen name="SearchProducts" component={SearchProducts} options={{headerShown: false}}/>
        <Stack.Screen name="ProductDescription" component={ProductDescription} options={{title: 'Description'}}/>
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}
