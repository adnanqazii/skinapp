import React, { useState, createRef, useEffect, useContext } from 'react';
import Axios from "axios";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import Constants from "expo-constants";
const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
  : `api.example.com`;
const AdminView = ({ navigation, route }) => {
  const [showData, setShowData] = useState([]);
  console.log({ showData })
  useEffect(() => {
    // Axios.get(`http://${api}/admin_login`)
    //   .then((res) => {
    //     setShowData(res.data);
    //     console.log(res.data)
    //     // setemp_id1(res.data.insertId);
    //   })
    //   .catch((err) => {
    //     setErrortext(err.Error);
    //     console.log("This is error", JSON.stringify(err));
        
    //   });
      setShowData([
        {
            "id": 3094,
            "name": "A",
            "qualification": "qualification",
            "experience": 0,
            "timing": "timing",
            "online": 1,
            "charges": "charges",
            "email": "adnanqazi123@gmail.c",
            "password": "$2a$10$dMW.W2wwKtOmGwbMnS/kzedldWW52auVYVI/UBwGO.m.XWsVbnApG",
            "speciality": "A",
            "PMDCID": "A"
        },
        {
            "id": 3095,
            "name": "A",
            "qualification": "qualification",
            "experience": 0,
            "timing": "timing",
            "online": 1,
            "charges": "charges",
            "email": "adnanqazi123@gmail.c",
            "password": "$2a$10$r96wcDY8NhYnKDLO2R3WjuMZrZ/fCvUwqKoDmZAszWiDHiN5671LW",
            "speciality": "A",
            "PMDCID": "A"
        },
        {
            "id": 3096,
            "name": "A",
            "qualification": "qualification",
            "experience": 0,
            "timing": "timing",
            "online": 1,
            "charges": "charges",
            "email": "adnanqazi123@gmail.c",
            "password": "$2a$10$OfAliSjOtiZi5KbHOb8fEOByXMNWQDEnMxmK.M.q59a7GmKsRfMRe",
            "speciality": "A",
            "PMDCID": "A"
        },
        {
            "id": 3097,
            "name": "A",
            "qualification": "qualification",
            "experience": 0,
            "timing": "timing",
            "online": 1,
            "charges": "charges",
            "email": "adnanqazi123@gmail.c",
            "password": "$2a$10$U4aXghaAhLFsUVpEHySV8OpvAlBdRxOJ8ojig0Mfw4E65N0iY1OH.",
            "speciality": "A",
            "PMDCID": "A"
        },
        {
            "id": 3098,
            "name": "A",
            "qualification": "qualification",
            "experience": 0,
            "timing": "timing",
            "online": 1,
            "charges": "charges",
            "email": "adnanqazi123@gmail.c",
            "password": "$2a$10$sA5vm3Ez5B4L8KGo1J/W1.V7vGt46I1T1ujD6gxbW6lyWrJ4/1J1G",
            "speciality": "A",
            "PMDCID": "A"
        },
        {
            "id": 3099,
            "name": "A",
            "qualification": "qualification",
            "experience": 0,
            "timing": "timing",
            "online": 1,
            "charges": "charges",
            "email": "adnanqazi123@gmail.com",
            "password": "$2a$10$RYJDntP7CS5aDclGblH7SOeVJzbjHM27VssR.NcN160QbDeKvq9dq",
            "speciality": "A",
            "PMDCID": "A"
        }
    ]);
  }, []);


  const handleAcceptPress = (data, index) => {
    console.log({ data })
    // Axios.post(`http://${api}/doctor_signup`, data)
    //   .then((res) => {
    //     console.log("This is res", { res })
    //     alert(`Application Succeeded.. for ${data.name}`)
    //     Axios.post(`http://${api}/delete_doctor_in`, data)
    //     .then((res) => {
    //       console.log("Deleted Successfully...")
    //     })
    //     .catch((err) => {
    //       setErrortext(err.Error);
    //       console.log("This is error", JSON.stringify(err));
    //     });
    //     const dataCopy = [...showData];
    //     console.log("This is index", index);
    //     dataCopy.splice(showData[index], 1);
    //     setShowData(dataCopy);
        


    //   })
    //   .catch((err) => {
    //     setErrortext(err.Error);
       
    //     console.log("This is error", JSON.stringify(err));
    //   });
      alert(`Application Succeeded.. for ${data.name}`)

      const dataCopy = [...showData];
      console.log("This is index", index);
      dataCopy.splice(showData[index], 1);
      setShowData(dataCopy);
  }
  const handleRejectPress = (data, index) => {
    console.log(data)
    // Axios.post(`http://${api}/doctor_signup`, data)
    // .then((res) => {
    //   console.log("This is res",{res})
    //   alert(`Application Rejected.. for ${data.name}`)
    //   const dataCopy = [...showData];
    //   console.log("This is index",index);
    //   dataCopy.splice(showData[index], 1);
    //   setShowData(dataCopy);


    // })
    // .catch((err) => {
    //   setErrortext(err.Error);
    //   console.log("This is error", JSON.stringify(err));
    // });
    // Axios.post(`http://${api}/delete_doctor_in`, data)
    // .then((res) => {
    //   console.log("Deleted Successfully...")
    // })
    // .catch((err) => {
    //   setErrortext(err.Error);
    //   console.log("This is error", JSON.stringify(err));
    // });
    const dataCopy = [...showData];
    console.log("This is index", index);
    dataCopy.splice(showData[index], 1);
    setShowData(dataCopy);
  }



  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Name</DataTable.Title>


        <DataTable.Title>Email</DataTable.Title>
        <DataTable.Title>PMCID</DataTable.Title>
        <DataTable.Title>Accept</DataTable.Title>
        <DataTable.Title>Reject</DataTable.Title>
      </DataTable.Header>

      {showData.map((data, index) => {
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell>{data.name}</DataTable.Cell>
            {/* <DataTable.Cell>{data.Qualification}</DataTable.Cell> */}
            <DataTable.Cell>{data.email}</DataTable.Cell>
            <DataTable.Cell>{data.PMDCID}</DataTable.Cell>
            {/* <Button title='Accept' onPress={() => { handleAcceptPress(data, index) }}></Button>
            <Button title='Reject' onPress={() => { handleRejectPress(data, index) }}></Button> */}
            <View><Button title='Accept' onPress={() => { handleAcceptPress(data, index) }}></Button></View>
            <View><Button title='Reject' onPress={() => { handleRejectPress(data, index) }}></Button></View>
          </DataTable.Row>
        );
      })}



    </DataTable>
  );

};
export default AdminView;
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});