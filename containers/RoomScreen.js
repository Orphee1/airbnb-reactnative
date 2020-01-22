import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
      ActivityIndicator,
      Image,
      ImageBackground,
      ScrollView,
      StyleSheet,
      Text,
      View
} from "react-native";
import Axios from "axios";

// Components import
import Roomcard from "../components /Roomcard";

export default function RoomScreen() {
      const [room, setRoom] = useState();
      const [isLoading, setIsLoading] = useState(true);
      const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(
            false
      );

      // const obj = useRoute();
      const route = useRoute();
      const params = route.params;
      const id = params.id;
      console.log(id);
      console.log(room);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        console.log("new render");
                        const response = await Axios.get(
                              "https://airbnb-api.herokuapp.com/api/room/" + id
                        );

                        if (response) {
                              setRoom(response.data);
                              setIsLoading(false);
                        } else {
                              alert("An error occured");
                        }
                  } catch (error) {
                        alert(error.message);
                  }
            };
            fetchData();
      }, []);

      return (
            <ScrollView>
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
                        <View
                              style={{
                                    marginHorizontal: 10
                              }}
                        >
                              <Roomcard item={room} />
                              <Text
                                    onPress={() => {
                                          setIsDescriptionDisplayed(
                                                !isDescriptionDisplayed
                                          );
                                    }}
                                    numberOfLines={
                                          isDescriptionDisplayed === false
                                                ? 3
                                                : 0
                                    }
                              >
                                    {room.description}
                              </Text>
                        </View>
                  )}
            </ScrollView>
      );
}

const styles = StyleSheet.create({});
