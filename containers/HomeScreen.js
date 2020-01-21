import React, { useState, useEffect } from "react";
import {
      ActivityIndicator,
      FlatList,
      ScrollView,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import Axios from "axios";

// Components import
import Roomcard from "../components /Roomcard";

export default function HomeScreen() {
      const [isLoading, setIsloading] = useState();
      const [rooms, setRooms] = useState();

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await Axios.get(
                              "https://airbnb-api.herokuapp.com/api/room?city=paris"
                        );
                        if (response.data.rooms) {
                              console.log(response.data.rooms);
                              setRooms(response.data.rooms);
                              setIsloading(false);
                        } else {
                              alert("An error occurred");
                        }
                  } catch (error) {
                        alert(error.message);
                        console.log(error);
                  }
            };

            fetchData();
      }, []);

      return (
            <>
                  {isLoading ? (
                        <View
                              style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                              }}
                        >
                              <ActivityIndicator size="large" color="red" />
                        </View>
                  ) : (
                        <FlatList
                              data={rooms}
                              renderItem={({ item }) => {
                                    return (
                                          <TouchableOpacity
                                                style={{ padding: 20 }}
                                          >
                                                <Roomcard item={item} />
                                          </TouchableOpacity>
                                    );
                              }}
                        ></FlatList>
                  )}
            </>
      );
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
      }
});
