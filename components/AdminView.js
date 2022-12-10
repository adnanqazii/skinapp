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
    Axios.get(`http://${api}/admin_login`)
      .then((res) => {
        setShowData(res.data);
        console.log(res.data)
        // setemp_id1(res.data.insertId);
      })
      .catch((err) => {
        setErrortext(err.Error);
        console.log("This is error", JSON.stringify(err));
      });
  }, []);


  const handleAcceptPress = (data, index) => {
    console.log({ data })
    Axios.post(`http://${api}/doctor_signup`, data)
      .then((res) => {
        console.log("This is res", { res })
        alert(`Application Succeeded.. for ${data.name}`)
        Axios.post(`http://${api}/delete_doctor_in`, data)
        .then((res) => {
          console.log("Deleted Successfully...")
        })
        .catch((err) => {
          setErrortext(err.Error);
          console.log("This is error", JSON.stringify(err));
        });
        const dataCopy = [...showData];
        console.log("This is index", index);
        dataCopy.splice(showData[index], 1);
        setShowData(dataCopy);
        


      })
      .catch((err) => {
        setErrortext(err.Error);
        console.log("This is error", JSON.stringify(err));
      });
     
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
    Axios.post(`http://${api}/delete_doctor_in`, data)
    .then((res) => {
      console.log("Deleted Successfully...")
    })
    .catch((err) => {
      setErrortext(err.Error);
      console.log("This is error", JSON.stringify(err));
    });
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