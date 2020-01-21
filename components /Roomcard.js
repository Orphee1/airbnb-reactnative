import React from "react";
import {
      ActivityIndicator,
      Button,
      Image,
      ImageBackground,
      Text,
      View,
      FlatList,
      ScrollView
} from "react-native";
// Icon import
import { Ionicons } from "@expo/vector-icons";

export default function Roomcard({ item }) {
      // const { item } = props;
      const size = 50;
      const stars = [];

      for (let i = 0; i < 5; i++) {
            if (i < item.ratingValue) {
                  stars.push(
                        <Ionicons
                              key={i}
                              name="ios-star"
                              color="gold"
                              size={20}
                        />
                  );
            } else {
                  stars.push(
                        <Ionicons
                              key={i}
                              name="ios-star"
                              color="grey"
                              size={20}
                        />
                  );
            }
      }

      return (
            <>
                  <ImageBackground
                        style={{
                              width: "100%",
                              height: 200
                        }}
                        source={{
                              uri: item.photos[0]
                        }}
                  >
                        <View
                              style={{
                                    backgroundColor: "rgba(0,0,0,0.9)",
                                    position: "absolute",
                                    bottom: 10,
                                    left: 0,
                                    padding: 15,
                                    alignItems: "center",
                                    justifyContent: "center"
                              }}
                        >
                              <Text
                                    style={{
                                          color: "white"
                                    }}
                              >
                                    {item.price} €
                              </Text>
                        </View>
                  </ImageBackground>
                  <View
                        style={{
                              flexDirection: "row"
                        }}
                  >
                        <View style={{ flex: 1 }}>
                              <Text>{item.title}</Text>
                              <View
                                    style={{
                                          flexDirection: "row",
                                          alignItems: "center"
                                    }}
                              >
                                    {stars}
                                    <Text
                                          style={{
                                                marginLeft: 10
                                          }}
                                    >
                                          {/* {`{item.reviews} `} */}
                                          {item.reviews}
                                          review(s)
                                    </Text>
                              </View>
                              <Image
                                    style={{
                                          height: size,
                                          width: size,
                                          borderRadius: size / 2 // Ce borderRadius fait planter Android
                                    }}
                                    source={{
                                          uri: item.user.account.photos[0]
                                    }}
                              />
                        </View>
                  </View>
            </>
      );
}
