// imports
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// screens
import Login from "./components/Login.js"
import Register from './components/Register.js';
import MainMenu from './components/MainMenu.js';
import SignOut from './components/SignOut.js';
import RecipeAdd from './components/recipes/RecipeAdd.js';
import ViewRecipe from './components/recipes/ViewRecipe.js';
import editRecipe from './components/recipes/EditRecipe.js';


// define navigation
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function MainStackNavigator() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Main Menu'
        component={MainDrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="RecipeAdd" component={RecipeAdd} options={{ headerShown: false }} />
      <Stack.Screen name='ViewRecipe' component={ViewRecipe} options={{ headerShown: false }} />
      <Stack.Screen name='EditRecipe' component={editRecipe} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Main Menu'>
      <Drawer.Screen name='Main Menu' component={MainMenu} />
      <Drawer.Screen name="Sign Out" component={SignOut} />
      


    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}