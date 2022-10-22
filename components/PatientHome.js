import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import {
  Backdrop,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


const PatientHome = () => {


  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPressed, setisPressed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const OpenCamera = async () => {
    const cameraStatus = await Camera.requestPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    setisPressed((prev) => !prev);
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (

    <View style={{ flex: 1 }}>

      <Backdrop
        revealed={revealed}
        header={
          <AppBar
            title="Skin App"
            transparent
            leading={props => (
              <IconButton
                icon={props => (
                  <Icon name={revealed ? "close" : "menu"} {...props} />
                )}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
              />
            )}
          />
        }
        backLayer={
          <View
          >
            <Button
              onPress={OpenCamera}
              title="Scan Skin Area"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
             <Button
              onPress={pickImage}
              title="Pick Image from Gallery"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              title="Flip Image"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
            </Button>
            <Button title="Take Picture" onPress={() => takePicture()} />
           
          </View>
        }

      >
        <View style={{ flex: 1 }}>

          {isPressed ? <View style={styles.cameraContainer}>
            <Camera
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1:1'} />
          </View>
            : null}
             {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </View>
      </Backdrop>



    </View>


  );
};
export default PatientHome;
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
})