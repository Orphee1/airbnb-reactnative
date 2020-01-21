import React, { useState, useEffect } from "react";
import {
      ActivityIndicator,
      FlatList,
      Image,
      ScrollView,
      StyleSheet,
      Text,
      View
} from "react-native";
import Axios from "axios";
// import TestImage from "../assets/testImage.jpg";

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
                                          <>
                                                <Image
                                                      source={item.photos}
                                                      style={{
                                                            width: 300,
                                                            height: 150
                                                      }}
                                                />
                                                <Text>{item.title}</Text>
                                          </>
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
