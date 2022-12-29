import React, { useState, createRef, useEffect, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
    Pressable,
} from 'react-native';
// import Drawer from './Drawer'
import { AutoFocus, Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ListItem, Avatar } from "@react-native-material/core";
import Axios from 'axios'

import {
    Backdrop,
    AppBar,
    IconButton,
    BackdropSubheader
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { DiseaseContext, PatientContext } from '../contexts';
import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
    : `api.example.com`;
const api2 = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
    : `api.example.com`;







const Call = ({ navigation, route }) => {
    const [type, setType] = useState(Camera.Constants.Type.front);

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const OpenCamera = async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    };
    useEffect(() => { OpenCamera() }, [])
    const [camera, setCamera] = useState(null);

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (

        <View style={styles.cameraContainer}>
            <Camera
                ref={ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio={'1:1'} />
        </View>

    );
};
export default Call;
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    heightAuto: {
        height: 'auto'
    },
    fill: {
        flex: 1
    },
    spaces: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
