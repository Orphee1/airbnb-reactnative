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

export default function SignupScreen({ setToken }) {
      const navigation = useNavigation();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [username, setUsername] = useState();
      const [name, setName] = useState();
      const [description, setDescription] = useState();
      console.log(email);
      console.log(password);
      console.log(username);
      console.log(name);
      console.log(description);

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
                              width: "100%",
                              justifyContent: "flex-start"
                        }}
                  >
                        <TouchableOpacity
                              onPress={() => {
                                    navigation.navigate("Signin");
                              }}
                        >
                              <Text
                                    style={{
                                          color: "white",
                                          fontSize: 40,
                                          marginLeft: 30
                                    }}
                              >
                                    X
                              </Text>
                        </TouchableOpacity>
                        <Text
                              style={{
                                    color: "white",
                                    fontSize: 25,
                                    fontWeight: "600"
                              }}
                        >
                              Rejoignez la communauté Airbnb
                        </Text>
                  </View>
                  <View
                        style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center"
                        }}
                  >
                        <KeyboardAvoidingView
                              behavior="padding"
                              style={{
                                    flex: 1,
                                    paddingTop: 60,
                                    alignItems: "center"
                              }}
                        >
                              <View>
                                    <Text
                                          style={{
                                                color: "white",
                                                fontSize: 20
                                          }}
                                    >
                                          Adresse e-mail :
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
                                          Username :
                                    </Text>
                                    <TextInput
                                          autoCapitalize="none"
                                          style={styles.textInput}
                                          placeholder="username"
                                          value={username}
                                          onChangeText={text => {
                                                setUsername(text);
                                          }}
                                    ></TextInput>
                                    <Text
                                          style={{
                                                color: "white",
                                                fontSize: 20
                                          }}
                                    >
                                          Name :
                                    </Text>
                                    <TextInput
                                          autoCapitalize="none"
                                          style={styles.textInput}
                                          placeholder="name"
                                          value={name}
                                          onChangeText={text => {
                                                setName(text);
                                          }}
                                    ></TextInput>
                                    <Text
                                          style={{
                                                color: "white",
                                                fontSize: 20
                                          }}
                                    >
                                          Description :
                                    </Text>
                                    <TextInput
                                          autoCapitalize="none"
                                          multiline="true"
                                          style={styles.textInput}
                                          placeholder="description"
                                          value={description}
                                          onChangeText={text => {
                                                setDescription(text);
                                          }}
                                    ></TextInput>

                                    <Text
                                          style={{
                                                color: "white",
                                                fontSize: 20
                                          }}
                                    >
                                          Mode passe :
                                    </Text>
                                    <TextInput
                                          secureTextEntry={true}
                                          style={styles.textInput}
                                          placeholder="mot de passe"
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
                              title="sign-up"
                              mode="contained"
                              onPress={async () => {
                                    try {
                                          const response = await Axios.post(
                                                // "https://airbnb-api.herokuapp.com/api/user/sign_up",

                                                "http://localhost:3100/api/user/sign_up",

                                                {
                                                      email: email,
                                                      password: password,
                                                      name: name,
                                                      username: username,
                                                      description: description
                                                }
                                          );

                                          if (response.data.token) {
                                                setToken(response.data.token);
                                                console.log(
                                                      response.data.account
                                                );
                                          }
                                    } catch (error) {
                                          alert(error.message);
                                          console.log(error);
                                    }
                              }}
                        >
                              <Text
                                    style={{
                                          color: "#FA5A60",
                                          fontSize: 22
                                    }}
                              >
                                    Inscription
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
