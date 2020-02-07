import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";
import MapView from "react-native-maps";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function MapScreen() {
      const [location, setLocation] = useState(null);
      const navigation = useNavigation();
      const route = useRoute();
      const rooms = route.params.rooms;
      // console.log(rooms);

      useEffect(() => {
            const askPermission = async () => {
                  const { status } = await Permissions.askAsync(
                        Permissions.LOCATION
                  );

                  if (status === "granted") {
                        const location = await Location.getCurrentPositionAsync(
                              {}
                        );
                        alert(JSON.stringify(location));
                        setLocation(location);
                  } else {
                        let latSum = 0;
                        let lonSum = 0;
                        for (let i = 0; i < rooms.length; i++) {
                              latSum = latSum + rooms[i].loc[1];
                              lonSum = lonSum + rooms[i].loc[0];
                        }
                        let latAverage = latSum / rooms.length;
                        let lonAverage = lonSum / rooms.length;
                        console.log(latAverage);
                        console.log(lonAverage);

                        setLocation({
                              coords: {
                                    latitude: latAverage,
                                    longitude: lonAverage
                              }
                        });
                  }
            };
            askPermission();
      }, []);

      return (
            <>
                  {location ? (
                        <MapView
                              showsUserLocation={true}
                              style={{ height: 800, marginTop: 50 }}
                              // provider="google"
                              initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.2,
                                    longitudeDelta: 0.2
                              }}
                        >
                              {rooms.map((room, index) => {
                                    return (
                                          <MapView.Marker
                                                key={index}
                                                coordinate={{
                                                      latitude: room.loc[1],
                                                      longitude: room.loc[0]
                                                }}
                                                title={room.title}
                                                description={room.description}
                                                onPress={() => {
                                                      navigation.navigate(
                                                            "Room",
                                                            {
                                                                  id: room._id
                                                            }
                                                      );
                                                }}
                                          >
                                                <View
                                                      style={{
                                                            width: 40,
                                                            height: 20,
                                                            backgroundColor:
                                                                  "white",
                                                            justifyContent:
                                                                  "center",
                                                            alignItems: "center"
                                                      }}
                                                >
                                                      <Text>
                                                            {room.price} €
                                                      </Text>
                                                </View>
                                          </MapView.Marker>
                                    );
                              })}
                        </MapView>
                  ) : (
                        <ActivityIndicator size="large" color="red" />
                  )}
            </>
      );
}
