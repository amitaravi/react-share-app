import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GoogleLogin from "../../screens/googleLogin";

import LoginScreen from "../../screens/Login";
import Register from "../../screens/Register";


const Stack = createStackNavigator();



const AuthStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen name="Login" component={GoogleLogin} options={{ headerShown: false }} />
               <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack;