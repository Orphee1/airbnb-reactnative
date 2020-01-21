import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Pages import
import HomeScreen from "./containers/HomeScreen";
import SigninScreen from "./containers/SigninScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
      return (
            <NavigationNativeContainer>
                  <Stack.Navigator>
                        <Stack.Screen name="Signin">
                              {() => <SigninScreen />}
                        </Stack.Screen>
                  </Stack.Navigator>
            </NavigationNativeContainer>
      );
}
