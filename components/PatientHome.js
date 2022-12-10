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


function HomeScreen({ navigation }) {
  const [done, setDone] = useState(false)
  const takePicture = async () => {
    if (camera) {
      const result = await camera.takePictureAsync(null)
      setDone(false)
      setImage(result.uri);
      if (!result.cancelled) {
        setDone(false)
        setImage(result.uri);

        const data = new FormData();
        data.append('image', {
          name: 'image.jpeg',
          type: "image/jpeg",
          uri: result.uri
        });
        console.log({ data })

        Axios({
          method: "post",
          url: `http://${api2}/upload`,
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          if (response.status === 200) {
            setClassified(response.data);
          }
        })
          .catch((err) => {
            console.log({ err });
          })

      };
    }
  }
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [classified, setClassified] = useContext(DiseaseContext);
  const OpenCamera = async () => {
    const cameraStatus = await Camera.requestPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
  };
  useEffect(() => { OpenCamera() }, [])
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={done ? styles.heightAuto : styles.fill}>

      {
        !image &&
        <>
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
          <View style={styles.cameraContainer}>
            <Camera
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1:1'} />
          </View>
          <Button title='picture' onPress={takePicture}></Button>
        </>}

      {image && !done && (<>
        <Text style={{ fontSize: 20 }}>Your Picture</Text>
        <Image source={{ uri: image }} style={{ marginTop: 100, width: 150, height: 150, }} />
        <Button title="Done" onPress={() => setDone(true)} />
        {classified.prob >= 0.5 ? <Text>Found {classified.classname} with {classified.prob} probability</Text> : classified ? <Text>Could not
          classify among any disease due to poor probability: {classified.prob}</Text> : null}

      </>)}
    </View>
  );
}
function GalleryScreen({ navigation }) {
  const [done, setDone] = useState(false)
  const [classified, setClassified] = useContext(DiseaseContext);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setDone(false)
    setImage(result.uri);
    if (!result.cancelled) {
      setDone(false)
      setImage(result.uri);

      const data = new FormData();
      data.append('image', {
        name: 'image.jpeg',
        type: "image/jpeg",
        uri: result.uri
      });
      console.log({ data })

      Axios({
        method: "post",
        url: `http://${api2}/upload`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        if (response.status === 200) {
          setClassified(response.data);
        }
      })
        .catch((err) => {
          console.log({ err });
        })

    };
  }
  useEffect(() => { pickImage() }, [])
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  return (
    <>
      {image && !done && (<View style={styles.container}>

        <Text style={{ fontSize: 20 }}>Your Picture</Text>
        <Image source={{ uri: image }} style={{ width: 300, height: 300, }} />
        <Button title="Done" onPress={() => setDone(true)} />
        {classified.prob >= 0.5 ? <Text>Found {classified.classname} with {classified.prob} probability</Text> : <Text>Could not
          classify among any disease due to poor probability: {classified.prob}</Text>}

      </View>)}
    </>
  );
}


function DoctorsAppointments({ navigation }) {
  const [patient, setPatient] = useContext(PatientContext)
  console.log("PRINTING PATIENT", patient);


  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [showDoctors, setShowDoctors] = useState(false)



  const doctors_for_patient = async () => {
    Axios.get(`http://${api}/doctors_for_patient`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setDoctors(response.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getAppointments = async () => {
    Axios.post(`http://${api}/patient_appointments`, { id: patient.id })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setAppointments(response.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    doctors_for_patient()
    getAppointments()
  }, [])
  return (
    <View style={{ padding: 4 }}>
      <Text>Doctors;</Text>
      {doctors.map((doctor, i) => (

        <ListItem
          // onPress={()=>navigation.navigate('Appointment',{doctor})}
          onPress={() => navigation.navigate('AppointmentBooking', { doctor })}
          key={i}
          leadingMode="avatar"
          leading={
            <Avatar image={{ uri: "https://mui.com/static/images/avatar/3.jpg" }} />
          }
          title={doctor.name}
          secondaryText={"Speciality: " + doctor.speciality + " - Charges: " + doctor.charges + " - Timing: " + doctor.timing}
        />
      ))}
      <Text>
        Your Appointments:
      </Text>
      {appointments.map((app, i) => (
        <ListItem
          key={i}
          title={app.id}
        />
      ))}
    </View>
  )
}




const PatientHome = ({ navigation, route }) => {


  const Drawer = createDrawerNavigator();



  return (

    //   <Button
    //   onPress={OpenCamera}
    //   title="Scan Skin Area"
    //   color="#841584"
    //   accessibilityLabel="Learn more about this purple button"
    //   style={styles.spaces}
    // />

    // <Button
    //   onPress={pickImage}
    //   title="Pick Image from Gallery"
    //   color="#841584"
    //   accessibilityLabel="Learn more about this purple button"
    // />
    // <Button
    //   title="Flip Image"
    //   onPress={() => {
    //     setType(
    //       type === Camera.Constants.Type.back
    //         ? Camera.Constants.Type.front
    //         : Camera.Constants.Type.back
    //     );
    //   }}>
    // </Button>
    // <Button title="Take Picture" onPress={() => takePicture()} />
    // <Button title="Book an Appointment" onPress={() => setShowDoctors(true)} />
    <View style={{ flex: 1 }}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Scan Skin Area" component={HomeScreen} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name="Scan Image from Gallery" component={GalleryScreen} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name="Doctors and Appointments" component={DoctorsAppointments} options={{ unmountOnBlur: true }} />
      </Drawer.Navigator>

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
