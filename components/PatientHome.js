import React, { useState, createRef, useEffect, useContext } from 'react';
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
import { ListItem, Avatar } from "@react-native-material/core";
import Axios from 'axios'

import {
  Backdrop,
  AppBar,
  IconButton,
  BackdropSubheader 
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PatientContext } from '../contexts';
import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
  : `api.example.com`;

const PatientHome = ({navigation,route}) => {

  const [patient,setPatient]=useContext(PatientContext)
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPressed, setisPressed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [appointments,setAppointments]=useState([])
  const [doctors,setDoctors]=useState([])
  const [done,setDone]=useState(false)
  const OpenCamera = async () => {
    const cameraStatus = await Camera.requestPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    setisPressed((prev) => !prev);
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setDone(false)
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
      setDone(false)
      setImage(result.uri);
    }
  };
  const doctors_for_patient=async ()=>{
    Axios.get(`https://vercelskinapp1.vercel.app/doctors_for_patient`)
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
    const getAppointments=async()=>{
      Axios.post(`https://vercelskinapp1.vercel.app/patient_appointments`,{id:patient.id})
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
  useEffect(()=>{
    doctors_for_patient()
    getAppointments()
  },[])

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
        <View style={done?styles.heightAuto:styles.fill}>

          {isPressed ? <View style={styles.cameraContainer}>
            <Camera
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1:1'} />
          </View>
            : null}
             {image && !done &&(<>
             
             <Image source={{ uri: image }} style={{ flex: 1 }} />
             <Button title="Done" onPress={()=>setDone(true)} />          
</>)}
        </View>
        {done&&(<View style={{padding:4}}>
          <Text>Doctors;</Text>
    {doctors.map((doctor,i)=>(
      
      <ListItem
      onPress={()=>navigation.navigate('Appointment',{doctor})}
        key={i}
        leadingMode="avatar"
        leading={
          <Avatar image={{ uri: "https://mui.com/static/images/avatar/3.jpg" }} />
        }
        title={doctor.name}
       secondaryText={"Speciality: "+ doctor.speciality+" - Charges: "+doctor.charges+" - Timing: "+doctor.timing}
     />
    ))}
      <Text>
  Your Appointments:
  </Text>
{appointments.map((app,i)=>(
  <ListItem
        key={i}
        title={app.id}
     />
))}
  </View>)}

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
  },
  heightAuto:{
    height:'auto'
  },
  fill:{
    flex:1
  }
})