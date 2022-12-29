import { useEffect, useState, useContext } from 'react';
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
  Button, Dimensions, FlatList
} from 'react-native';

import { DoctorContext } from '../contexts';
import { ListItem } from "@react-native-material/core";
import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
  : `api.example.com`;

const Home = ({ navigation, route }) => {
  const [appointments, setAppointments] = useState([])
  const [doctor, setDoctor] = useContext(DoctorContext)
  console.log("RoutePArams:", route.params)
  const getAppointments = async () => {
    // Axios.post(`http://${api}/doctor_appointments`,{id:doctor.id})
    // .then((response) => {
    //   if (response.status === 200) {
    //     console.log(response);
    //     setAppointments(response.data)
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    setAppointments([
      {
        "id": 13,
        "patient_id": 6,
        "doctor_id": 11,
        "timing": "2022-12-10T17:32:07.",
        "taken_place": 0,
        "disease": "",
        "doctor_name": "Muaz Abbasi",
        "meeting_type": "Video Conference",
        "patient_name": "A"
      },
      {
        "id": 14,
        "patient_id": 6,
        "doctor_id": 11,
        "timing": "2022-12-10T17:32:07.",
        "taken_place": 0,
        "disease": "",
        "doctor_name": "Muaz Abbasi",
        "meeting_type": "Video Conference",
        "patient_name": "A"
      },
      {
        "id": 15,
        "patient_id": 6,
        "doctor_id": 11,
        "timing": "2022-12-10T17:32:07.",
        "taken_place": 0,
        "disease": "",
        "doctor_name": "Muaz Abbasi",
        "meeting_type": "Video Conference",
        "patient_name": "A"
      },
      {
        "id": 16,
        "patient_id": 6,
        "doctor_id": 11,
        "timing": "2022-12-10T17:32:07.",
        "taken_place": 0,
        "disease": "",
        "doctor_name": "Muaz Abbasi",
        "meeting_type": "Video Conference",
        "patient_name": "A"
      },
      {
        "id": 17,
        "patient_id": 6,
        "doctor_id": 11,
        "timing": "2022-12-10T17:33:06.",
        "taken_place": 0,
        "disease": "",
        "doctor_name": "Muaz Abbasi",
        "meeting_type": "",
        "patient_name": "A"
      }
    ])

  }
  useEffect(() => {
    getAppointments()
  }, [])
  return (
    //      <View>
    //         <Text>
    //   Your Appointments {route.params.name}  :
    //   </Text>
    // {appointments.map((app,i)=>(
    //   <ListItem
    //         key={i}
    //         title={app.id}
    //      />
    // ))}
    //   </View>
    <View style={styles.container}>
      {
        appointments.length ? <FlatList
          data={appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('History', { item })} >
              <View style={styles.cardContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>Patient: {item.patient_name}</Text>
                  <Text>Meeting type: {item.meeting_type}</Text>
                  <Text>Meeting time: {item.timing}</Text>
                </View>
              </View>
            </TouchableOpacity>


          )}
        /> :
          <View>
            <Text>DR {doctor.name} You dont have any appointments yet..</Text>
          </View>
      }
    </View>

  )

};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    marginVertical: 30,
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 12,
    width: Dimensions.get("window").width * 0.8,
  },
  headerContainer: {
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    paddingRight: 20,
  },
});