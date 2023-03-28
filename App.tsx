import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "./screens/Login";
import Register from './screens/Register';
import LandingPage from './screens/LandingPage';
import AddProduct from './screens/AddProduct';
import UserProducts from './screens/UserProducts';
import SearchResults from './screens/SearchResults';
import SearchProducts from './screens/SearchProducts';
import ProductDescription from './screens/ProductDescription';
import Favorites from './screens/Favorites';
import RootNavigation from './src/navigation/mainNavigation';



// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function HomeStack(){
//   return(
//     <Drawer.Navigator >
//       <Drawer.Screen name="LandingPage" component={LandingPage}  options={{ title: 'Home' }}/>
//       <Drawer.Screen name="AddProduct" component={AddProduct} options={{ title: 'Add Products' }} />
//       <Drawer.Screen name="MyProducts" component={UserProducts} options={{ title: 'Edit Products' }} />
//       <Drawer.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
//     </Drawer.Navigator>
   

//   );
//  }


export default function App() {

  return (
  //    <NavigationContainer>
  //      <Stack.Navigator initialRouteName="Login">
  //      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
  //      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  //      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
  //      <Stack.Screen name="MyProducts" component={UserProducts} options={{ headerShown: false }} />
  //      {/* <Stack.Screen name="LandingPage" component={LandingPage} options={{ title: 'Landing Page' }} /> */}
  //      <Stack.Screen name="HomePage" component={HomeStack} options={{ headerShown: false }}/>
  //      <Stack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }} />
  //      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
  //      <Stack.Screen name="SearchProducts" component={SearchProducts} options={{ title: 'Products' }}/>
  //      <Stack.Screen name="ProductDescription" component={ProductDescription} options={{ title: 'Description' }}/>
  
  // </Stack.Navigator>
      
  //    </NavigationContainer>

  <RootNavigation/>
  );
}
