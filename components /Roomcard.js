import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

import Colors from "../assets/Colors";
// Icon import
import { Ionicons } from "@expo/vector-icons";

export default function Roomcard({ item }) {
      const size = 50;
      const stars = [];
      console.log(item.photos);
      console.log(item.photos.length);

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
            <View
                  style={{
                        paddingBottom: 10
                  }}
            >
                  <Swiper
                        horizontal={true}
                        showsPagination={false}
                        autoplay={true}
                        activeDotColor={Colors.pink}
                        height={260}
                  >
                        {item.photos.map((photo, index) => {
                              return (
                                    <ImageBackground
                                          key={index}
                                          style={{
                                                width: "100%",
                                                height: 250
                                          }}
                                          source={{
                                                uri: photo
                                          }}
                                    >
                                          <View
                                                style={{
                                                      backgroundColor:
                                                            "rgba(0,0,0,0.9)",
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
                              );
                        })}
                  </Swiper>
                

                  <View
                        style={{
                              flexDirection: "row"
                        }}
                  >
                        <View style={{ flex: 1 }}>
                              <Text style={styles.title}>{item.title}</Text>
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
                                          {item.reviews}
                                          review(s)
                                    </Text>
                              </View>
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
      );
}

const styles = StyleSheet.create({
      title: {
            fontSize: 20
      }
});
