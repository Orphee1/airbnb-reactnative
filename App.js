import React, { useState, useEffect } from "react";
import { AsyncStorage, Dimensions } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Pages import
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import MapScreen from "./containers/MapScreen";
import SigninScreen from "./containers/SigninScreen";
import SignupScreen from "./containers/SignupScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SettingsScreen from "./containers/SettingsScreen";

// Icon import
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
console.log(height);

export default function App() {
      const [userToken, setUsertoken] = useState("ZEuTI5ZIyPRc2D7y");
      // const [userToken, setUsertoken] = useState();
      const [isLoading, setIsloading] = useState(false);
      const [name, setName] = useState();
      console.log("userToken is " + userToken);

      const setToken = async token => {
            if (token) {
                  AsyncStorage.setItem("userToken", token);
            } else {
                  AsyncStorage.removeItem("userToken");
            }
            setUsertoken(token);
            // console.log("userToken is " + userToken);
      };

      useEffect(() => {
            // Fetch the token from storage then navigate to the appropriate page
            const bootstrapAsync = async () => {
                  AsyncStorage.getItem("userToken");
                  setUsertoken(userToken);
                  setIsloading(false);
            };
            bootstrapAsync();
      }, []);

      return (
            <NavigationNativeContainer>
                  <Stack.Navigator>
                        {isLoading ? (
                              <Stack.Screen
                                    name="Splash"
                                    component={() => null}
                              />
                        ) : userToken === null || userToken === undefined ? (
                              <>
                                    <Stack.Screen
                                          name="Signin"
                                          options={{ header: () => null }}
                                    >
                                          {() => (
                                                <SigninScreen
                                                      setToken={setToken}
                                                      setName={setName}
                                                />
                                          )}
                                    </Stack.Screen>
                                    <Stack.Screen
                                          name="Signup"
                                          options={{ header: () => null }}
                                    >
                                          {() => (
                                                <SignupScreen
                                                      setToken={setToken}
                                                />
                                          )}
                                    </Stack.Screen>
                              </>
                        ) : (
                              <Tab.Screen
                                    name="Tab"
                                    options={{ header: () => null }}
                              >
                                    {() => (
                                          <Tab.Navigator
                                                screenOptions={({ route }) => {
                                                      return {
                                                            tabBarIcon: ({
                                                                  focused,
                                                                  color,
                                                                  size
                                                            }) => {
                                                                  let iconName;
                                                                  if (
                                                                        route.name ===
                                                                        "Settings"
                                                                  ) {
                                                                        iconName = `ios-options`;
                                                                  } else {
                                                                        iconName = `ios-home`;
                                                                  }
                                                                  return (
                                                                        <Ionicons
                                                                              name={
                                                                                    iconName
                                                                              }
                                                                              size={
                                                                                    size
                                                                              }
                                                                              color={
                                                                                    color
                                                                              }
                                                                        />
                                                                  );
                                                            },
                                                            title: route.name // know issue : route.name shouldn't be undefined
                                                      };
                                                }}
                                                tabBarOptions={{
                                                      activeTintColor: "tomato",
                                                      inactiveTintColor: "gray"
                                                }}
                                          >
                                                <Tab.Screen name="home">
                                                      {() => (
                                                            <Stack.Navigator>
                                                                  <Stack.Screen
                                                                        name="Home"
                                                                        options={{
                                                                              title:
                                                                                    "My App"
                                                                        }}
                                                                  >
                                                                        {() => (
                                                                              <HomeScreen />
                                                                        )}
                                                                  </Stack.Screen>
                                                                  <Stack.Screen name="Room">
                                                                        {() => (
                                                                              <RoomScreen />
                                                                        )}
                                                                  </Stack.Screen>
                                                                  <Stack.Screen name="Map">
                                                                        {() => (
                                                                              <MapScreen />
                                                                        )}
                                                                  </Stack.Screen>
                                                            </Stack.Navigator>
                                                      )}
                                                </Tab.Screen>
                                                <Tab.Screen name="Settings">
                                                      {() => (
                                                            <Stack.Navigator>
                                                                  <Stack.Screen
                                                                        name="Settings"
                                                                        // options={{
                                                                        //       title: settings
                                                                        // }}
                                                                  >
                                                                        {() => (
                                                                              <SettingsScreen
                                                                                    setToken={
                                                                                          setToken
                                                                                    }
                                                                              />
                                                                        )}
                                                                  </Stack.Screen>
                                                            </Stack.Navigator>
                                                      )}
                                                </Tab.Screen>
                                                <Tab.Screen name="Profile">
                                                      {() => (
                                                            <Stack.Navigator>
                                                                  <Stack.Screen
                                                                        name="Profile"
                                                                        options={{
                                                                              title:
                                                                                    "User Profile"
                                                                        }}
                                                                  >
                                                                        {() => (
                                                                              <ProfileScreen
                                                                                    setToken={
                                                                                          setToken
                                                                                    }
                                                                                    name={
                                                                                          name
                                                                                    }
                                                                              />
                                                                        )}
                                                                  </Stack.Screen>
                                                            </Stack.Navigator>
                                                      )}
                                                </Tab.Screen>
                                          </Tab.Navigator>
                                    )}
                              </Tab.Screen>
                        )}
                  </Stack.Navigator>
            </NavigationNativeContainer>
      );
}
