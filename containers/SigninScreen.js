import React, { useState } from "react";
import {
      KeyboardAvoidingView,
      ScrollView,
      StyleSheet,
      Text,
      TextInput,
      TouchableOpacity,
      View
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import Axios from "axios";

// Icon import
import { Entypo } from "@expo/vector-icons";

export default function SigninScreen({ setToken }) {
      const navigation = useNavigation();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState(false);
      // console.log(email);
      // console.log(password);

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
                        <KeyboardAvoidingView
                              behavior="padding"
                              style={{
                                    flex: 1,
                                    paddingTop: 60,
                                    alignItems: "center"
                              }}
                        >
                              <View
                                    style={{
                                          width: "100%",
                                          justifyContent: "center",
                                          alignItems: "flexSart",
                                          paddingHorizontal: 20
                                    }}
                              >
                                    <Text
                                          style={{
                                                color: "white",
                                                fontSize: 20
                                          }}
                                    >
                                          Name:
                                    </Text>
                                    <TextInput
                                          autoCapitalize="none"
                                          style={styles.textInput}
                                          placeholder="email"
                                          value={email}
                                          onChangeText={text => {
                                                setEmail(text);
                                          }}
                                    ></TextInput>
                                    <Text
                                          style={{
                                                color: "white",
                                                fontSize: 20
                                          }}
                                    >
                                          Password:
                                    </Text>
                                    <TextInput
                                          secureTextEntry={true}
                                          style={[
                                                styles.textInput,
                                                {
                                                      marginTop: 20
                                                      // backgroundColor:
                                                      //       error === true
                                                      //             ? "red"
                                                      //             : "grey"
                                                }
                                          ]}
                                          placeholder="Password"
                                          value={password}
                                          onChangeText={text => {
                                                setPassword(text);
                                          }}
                                    ></TextInput>
                              </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity
                              style={{
                                    backgroundColor: "white",
                                    padding: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 10,
                                    marginVertical: 40,
                                    height: 64,
                                    width: 160,
                                    borderRadius: "50%"
                              }}
                              title="log-in"
                              mode="contained"
                              onPress={async () => {
                                    try {
                                          const response = await Axios.post(
                                                "https://airbnb-api.herokuapp.com/api/user/log_in",
                                                {
                                                      email: email,
                                                      password: password
                                                }
                                          );
                                          if (response.data.token) {
                                                // console.log(
                                                //       response.data.token
                                                // );
                                                setToken(response.data.token);
                                          }
                                    } catch (error) {
                                          alert(error.message);
                                    }
                              }}
                        >
                              <Text
                                    style={{
                                          color: "#FA5A60",
                                          fontSize: 22
                                    }}
                              >
                                    Connexion
                              </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                              onPress={() => {
                                    navigation.navigate("Signup");
                              }}
                        >
                              <Text style={{ color: "white" }}>
                                    Vous n'avez pas de compte ? Inscrivez-vous
                              </Text>
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
      textInput: {
            borderBottomWidth: 1,
            borderBottomColor: "white",
            color: "white",
            fontSize: 20,
            padding: 15,
            margin: 5,
            width: 300
      },
      title: {
            color: "white",
            marginVertical: 30,
            fontSize: 45,
            fontWeight: "300"
      }
});
