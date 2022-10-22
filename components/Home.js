import { useEffect, useState,useContext } from 'react';
import Axios from 'axios'
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Button
  } from 'react-native';
  import { DoctorContext } from '../contexts';
  import { ListItem } from "@react-native-material/core";

const Home = ({ navigation }) => {
  const [appointments,setAppointments]=useState([])
  const [doctor,setDoctor]=useContext(DoctorContext)
  const getAppointments=async()=>{
    Axios.post("http://192.168.0.105:3001/doctor_appointments",{id:doctor.id})
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
    getAppointments()
  },[])
    return (
     <View>
        <Text>
  Your Appointments:
  </Text>
{appointments.map((app,i)=>(
  <ListItem
        key={i}
        title={app.id}
     />
))}
  </View>)
    
  };

export default Home;