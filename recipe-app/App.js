import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from "./components/Login.js"
import Register from './components/Register.js';
import MainMenu from './components/MainMenu.js';
import UserSettings from './components/UserSettings.js';
import SignOut from './components/SignOut.js';
import AddRecipe from './components/recipes/addRecipe.js';
import EditRecipe from "./components/recipes/editRecipe.js"
import CookTime from "./components/recipes/cookTime.js"


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainRecipeScreens() {
  <Stack.Navigator>
    <Stack.Screen name="AddRecipe" component={AddRecipe} />
    <Stack.Screen name="EditRecipe" component={EditRecipe} />
    <Stack.Screen name="CookTime" component={CookTime} />
    <Stack.Screen name='Main Menu' component={MainDrawerNavigator} />
  </Stack.Navigator>
}

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Main Menu' component={MainDrawerNavigator} />
      <Stack.Screen name='Sign Out' component={MainDrawerNavigator} />
    </Stack.Navigator>
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Main Menu'>
      <Drawer.Screen name='Main Menu' component={MainMenu} />
      <Drawer.Screen name='User Settings' component={UserSettings} />
      <Drawer.Screen name="Sign Out" component={SignOut} />
      <Drawer.Screen name="AddRecipe" component={MainRecipeScreens} />
      <Drawer.Screen name="EditRecipe" component={MainRecipeScreens} />
      <Drawer.Screen name="CookTime" component={MainRecipeScreens} />
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