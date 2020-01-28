import React from "react";
import { AsyncStorage, StyleSheet, ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";

// Icon import

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileScreen({ setToken }) {
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
                        <MaterialIcons name="people" size={90} color="white" />

                        <Text style={styles.title}>Profile</Text>
                  </View>
                  <TouchableOpacity
                        onPress={() => {
                              setToken(null);
                        }}
                  >
                        <Text style={{ color: "white" }}>Déconnexion</Text>
                  </TouchableOpacity>
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
            color: "white",
            marginVertical: 30,
            fontSize: 45,
            fontWeight: "300"
      }
});
