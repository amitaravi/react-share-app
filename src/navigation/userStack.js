import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text } from "react-native";

import ProductDescription from "../../screens/ProductDescription";
import SearchProducts from "../../screens/SearchProducts";
import LandingPage from "../../screens/LandingPage";
import AddProduct from "../../screens/AddProduct";
import UserProducts from "../../screens/UserProducts";
import Favorites from "../../screens/Favorites";
import { signOut } from "firebase/auth";
import { auth } from "../../index";
import SearchPage from "../../screens/TestPage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const handleSignOut =async () => {
    try{
        await signOut(auth);
        console.log("user signed out")
    } catch(e){
        console.error(e);
    }

}

function HomeStack(){
    return(
      <Drawer.Navigator drawerContent={props => {
        return(
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
                <DrawerItem label="Logout" onPress={handleSignOut}/>
            </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="LandingPage" component={LandingPage}  options={{ title: 'Home' }}/>
        <Drawer.Screen name="AddProduct" component={AddProduct} options={{ title: 'Add Products' }} />
        <Drawer.Screen name="MyProducts" component={UserProducts} options={{ title: 'Edit Products' }} />
        <Drawer.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
      </Drawer.Navigator>
     
  
    );
   }
  
const UserStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomePage" component={HomeStack} options={{ headerShown: false }}/>
                <Stack.Screen name="SearchProducts" component={SearchProducts} options={{ title: 'Products' }}/>
                <Stack.Screen name="ProductDescription" component={ProductDescription} options={{ title: 'Description' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UserStack;