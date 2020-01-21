import React from "react";
import {
      Dimensions,
      KeyboardAvoidingView,
      ScrollView,
      StyleSheet,
      Text,
      TextInput,
      TouchableOpacity,
      View
} from "react-native";
import Constants from "expo-constants";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
console.log(width);
console.log(height);

// Icon import
import { Entypo } from "@expo/vector-icons";

export default function SigninScreen() {
      return (
            <ScrollView
                  style={{
                        paddingTop: Constants.statusBarHeight,
                        backgroundColor: "#FA5A60"
                  }}
                  contentContainerStyle={{
                        justifyContent: "center",
                        alignItems: "center"
                  }}
            >
                  <View
                        style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center"
                        }}
                  >
                        <Entypo name="home" size={90} color="white" />
                        <Text style={styles.title}>Welcome</Text>
                        <KeyboardAvoidingView>
                              <View
                                    style={{
                                          justifyContent: "center",
                                          alignItems: "center"
                                    }}
                              >
                                    <Text>Name:</Text>
                                    <TextInput placeholder="UserName"></TextInput>
                                    <Text>Password:</Text>
                                    <TextInput placeholder="Password"></TextInput>
                              </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity
                              style={{
                                    backgroundColor: "white",
                                    padding: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 10,
                                    marginVertical: 0,
                                    height: 44,
                                    width: 100,
                                    borderRadius: "50%"
                              }}
                              title="log-in"
                              mode="contained"
                        >
                              <Text>Log in</Text>
                        </TouchableOpacity>
                  </View>
            </ScrollView>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
      },
      title: {
            fontWeight: "200",
            color: "white",
            fontSize: 35
      }
});
