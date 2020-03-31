import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
      ActivityIndicator,
      ScrollView,
      StyleSheet,
      Text,
      View
} from "react-native";
import MapView from "react-native-maps";
import Axios from "axios";

// Components import
import Roomcard from "../components /Roomcard";

import defaultRoom from "../assets/defaultRoom";
export default function RoomScreen() {
      // const [room, setRoom] = useState(defaultRoom);
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
      // console.log(room.loc[1]);
      // console.log(room.loc[0]);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        console.log("new render");
                        const response = await Axios.get(
                              // "https://airbnb-api.herokuapp.com/api/room/" + id
                              "http://localhost:3100/api/room/" + id
                        );

                        if (response) {
                              setRoom(response.data);
                              console.log(response.data);

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
                              <MapView
                                    showsUserLocation={false}
                                    // provider="google"
                                    style={{ height: 300, marginTop: 50 }}
                                    initialRegion={{
                                          latitude: room.loc[1],
                                          longitude: room.loc[0],
                                          latitudeDelta: 0.03,
                                          longitudeDelta: 0.03
                                    }}
                              >
                                    <MapView.Marker
                                          coordinate={{
                                                latitude: room.loc[1],
                                                longitude: room.loc[0]
                                          }}
                                          title={room.title}
                                          pinColor="red"
                                    />
                              </MapView>
                        </View>
                  )}
            </ScrollView>
      );
}

const styles = StyleSheet.create({});
