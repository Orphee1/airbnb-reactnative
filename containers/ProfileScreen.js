import React, { useCallback, useState, useEffect } from "react";
import {
      AsyncStorage,
      Button,
      Clipboard,
      Dimensions,
      Image,
      StyleSheet,
      ScrollView,
      Text,
      View,
      Share,
      ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import Axios from "axios";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

// Icon import

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
console.log(height);

export default function ProfileScreen({ name, setToken }) {
      const [image, setImage] = useState();
      const [uploading, setUploading] = useState(false);
      // const fetchData = async () => {
      //       try {
      //             const response = await Axios.get(
      //                   "https://airbnb-api.herokuapp.com/api/user/:id"
      //             );
      //       } catch (error) {
      //             console.log(error.message);
      //       }
      // };

      const share = useCallback(() => {
            Share.share({
                  message: image,
                  title: "Check out this photo",
                  url: image
            });
      }, [image]);

      const copyToClipboard = useCallback(() => {
            Clipboard.setString(image);
            alert("Copied image URL to clipboard");
      }, [image]);

      const handleImagePicked = useCallback(async pickerResult => {
            let uploadResponse, uploadResult;
            try {
                  setUploading(true);
                  // console.log(pickerResult.uri);

                  if (!pickerResult.cancelled) {
                        uploadResponse = await uploadImageAsync(
                              pickerResult.uri
                        );
                        // console.log("Here we are");
                        // console.log(uploadResponse);

                        uploadResult = await uploadResponse.json();
                        // console.log("Here we are");
                        // console.log(uploadResult);
                        setImage(uploadResult);
                        // if (
                        //       Array.isArray(uploadResult) === true &&
                        //       uploadResult.length > 0
                        // ) {
                        //       // console.log("Here we are");
                        //       // console.log(uploadResult[0]);
                        //       console.log("Here we are");
                        //       console.log(uploadResult[0]);
                        //       setImage(uploadResult[0]);
                        // }
                  }
            } catch (error) {
                  // console.log({ uploadResponse });
                  // console.log({ uploadResult });
                  console.log({ error });
                  alert("Upload failed");
            } finally {
                  setUploading(false);
            }
      });

      const takePhoto = useCallback(async () => {
            const { status: cameraPerm } = await Permissions.askAsync(
                  Permissions.CAMERA
            );

            const { status: cameraRollPerm } = await Permissions.askAsync(
                  Permissions.CAMERA_ROLL
            );
            // only if user allows permission to camera AND camera roll
            if (cameraPerm === "granted" && cameraRollPerm === "granted") {
                  const pickerResult = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        aspect: [4, 3]
                  });
                  handleImagePicked(pickerResult);
            }
      });

      const pickImage = useCallback(async () => {
            const { status: cameraRollPerm } = await Permissions.askAsync(
                  Permissions.CAMERA_ROLL
            );

            // only if user allows permission to camera roll
            if (cameraRollPerm === "granted") {
                  const pickerResult = await ImagePicker.launchImageLibraryAsync(
                        {
                              allowsEditing: true,
                              aspect: [4, 3]
                        }
                  );
                  // console.log("Here we are");
                  // console.log(pickerResult);
                  handleImagePicked(pickerResult);
            }
      });

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

                  <View
                        style={{
                              flexDirection: "row",
                              width: width / 2,
                              // height: height / 6,
                              display: "flex",
                              justifyContent: "space-around"
                        }}
                  >
                        <Text style={{ color: "white", fontSize: 30 }}>
                              Bonjour
                        </Text>
                        <Text style={{ color: "white", fontSize: 30 }}>
                              {name}
                        </Text>
                  </View>
                  <Text style={styles.exampleText}>
                        Example: Upload ImagePicker result
                  </Text>
                  <Button
                        onPress={pickImage}
                        title="Pick an image from camera roll"
                  />
                  <Button onPress={takePhoto} title="Take a photo" />
                  {image && (
                        <View style={styles.maybeRenderContainer}>
                              <View style={styles.maybeRenderImageContainer}>
                                    <Image
                                          source={{ uri: image }}
                                          style={styles.maybeRenderImage}
                                    />
                              </View>
                              <Text
                                    onPress={copyToClipboard}
                                    onLongPress={share}
                                    style={styles.maybeRenderImageText}
                              >
                                    {image}
                              </Text>
                        </View>
                  )}
                  {uploading && (
                        <View
                              style={[
                                    StyleSheet.absoluteFill,
                                    styles.maybeRenderUploading
                              ]}
                        >
                              <ActivityIndicator color="#fff" size="large" />
                        </View>
                  )}

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

async function uploadImageAsync(uri) {
      // const apiUrl = "https://airbnb-api.herokuapp.com/api/user/upload_picture";
      const apiUrl = "http://localhost:3100/api/user/upload_picture";

      // Note:
      // Uncomment this if you want to experiment with local server
      //
      // if (Constants.isDevice) {
      //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
      // } else {
      //   apiUrl = `http://localhost:3000/upload`
      // }
      const uriParts = uri.split(".");
      console.log("here we are");

      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();
      formData.append("picture", {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`
      });
      // console.log(formData);
      const options = {
            method: "POST",
            body: formData,
            headers: {
                  // Authorization: "Bearer KbGrJosUZSNMwJaa",
                  Authorization: "Bearer NK0CAtu1NLGtuY3b",
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data"
            }
      };
      return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
      },
      exampleText: {
            fontSize: 20,
            marginBottom: 20,
            marginHorizontal: 15,
            textAlign: "center",
            color: "white"
      },
      maybeRenderUploading: {
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center"
      },
      maybeRenderContainer: {
            borderRadius: 3,
            elevation: 2,
            marginTop: 30,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: {
                  height: 4,
                  width: 4
            },
            shadowRadius: 5,
            width: 250
      },
      maybeRenderImageContainer: {
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            overflow: "hidden"
      },
      maybeRenderImage: {
            height: 250,
            width: 250
      },
      maybeRenderImageText: {
            paddingHorizontal: 10,
            paddingVertical: 10
      },
      title: {
            color: "white",
            marginVertical: 30,
            fontSize: 45,
            fontWeight: "300"
      }
});
