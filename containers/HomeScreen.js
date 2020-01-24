import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
      ActivityIndicator,
      FlatList,
      SafeAreaView,
      StyleSheet,
      Text,
      TouchableOpacity,
      View
} from "react-native";
import MapView from "react-native-maps";
import Axios from "axios";

// Components import

import Roomcard from "../components /Roomcard";

export default function HomeScreen() {
      const navigation = useNavigation();
      const [isLoading, setIsloading] = useState(true);
      const [rooms, setRooms] = useState();
      const [mapSelected, setMapSelected] = useState(false);

      console.log("repère");

      console.log(rooms);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await Axios.get(
                              "https://airbnb-api.herokuapp.com/api/room?city=paris"
                        );
                        if (response.data.rooms) {
                              // console.log(response.data.rooms);
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
                  <SafeAreaView>
                        <View
                              style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center"
                              }}
                        >
                              <TouchableOpacity
                                    title="Voir la liste"
                                    onPress={() => {
                                          setMapSelected(!mapSelected);
                                    }}
                                    style={{
                                          backgroundColor: "#FA5A60",
                                          borderRadius: "50%",
                                          padding: 5,
                                          width: 100,
                                          marginVertical: 10,
                                          alignItems: "center",
                                          justifyContent: "center"
                                    }}
                              >
                                    <Text style={{ color: "white" }}>
                                          {mapSelected === true
                                                ? "Voir la liste"
                                                : "Voir la carte"}
                                    </Text>
                              </TouchableOpacity>
                        </View>
                  </SafeAreaView>
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
                  ) : mapSelected === true ? (
                        <MapView
                              showsUserLocation={true}
                              style={{ height: 300, marginTop: 50 }}
                        >
                              {rooms.map((elem, index) => {
                                    return (
                                          <MapView.Marker
                                                coordinate={{
                                                      latitude: elem.loc[1],
                                                      longitude: elem.loc[0]
                                                }}
                                                title={elem.title}
                                                description={elem.description}
                                                key={index}
                                          />
                                    );
                              })}
                        </MapView>
                  ) : (
                        <FlatList
                              data={rooms}
                              renderItem={({ item }) => {
                                    return (
                                          <TouchableOpacity
                                                style={{ padding: 20 }}
                                                onPress={() => {
                                                      navigation.navigate(
                                                            "Room",
                                                            {
                                                                  id: item._id
                                                            }
                                                      );
                                                }}
                                          >
                                                <Roomcard item={item} />
                                                <View
                                                      style={{
                                                            borderBottomColor:
                                                                  "#CECECE",
                                                            borderBottomWidth: 1
                                                      }}
                                                ></View>
                                          </TouchableOpacity>
                                    );
                              }}
                              keyExtractor={room => {
                                    return room._id;
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
      },
      button: {
            backgroundColor: "#FA5A60"
      }
});
