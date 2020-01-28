import React from "react";
import {
      StyleSheet,
      ScrollView,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

// Icon import
import { AntDesign } from "@expo/vector-icons";

export default function SettingsScreen() {
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
                        <AntDesign name="setting" size={90} color="white" />
                        <Text style={styles.title}>Settings</Text>
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
            color: "white",
            marginVertical: 30,
            fontSize: 45,
            fontWeight: "300"
      }
});
