import React, {useState, createRef,useContext} from 'react';
import Axios from "axios";

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
} from 'react-native';
import Constants from "expo-constants";
import { DoctorContext } from '../contexts';
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
  : `api.example.com`;

const DoctorSignup = ({navigation}) =>{
const [inputs,setInputs]=useState({userName:'',userSpeciality:'',userEmail:'',userPassword:''});
const [errortext, setErrortext] = useState('');
const [doctor,setDoctor]=useContext(DoctorContext)

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);
 
  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
 
  const handleSubmitButton = () => {
    setErrortext('');
    console.log("Values:",inputs);
  //   const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
  //   if (!strongRegex.test(inputs.userEmail)) {
  //     alert('enter valid email')
  //     return;
  // }

  //  if ( !/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/.test(inputs.userPassword)) {
  //     alert('Must be atleast 8 characters and contains atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
  //     return;
  // }
  //   if (!inputs.userName) {
  //     alert('Please fill Name');
  //     return;
  //   }
  //   if (!inputs.userEmail) {
  //     alert('Please fill Email');
  //     return;
  //   }
  //   if (!inputs.userPhone) {
  //       alert('Please fill Phone');
  //       return;
  //     }
   

  //   if (!inputs.userSpeciality) {
  //       alert('Please fill Speciality');
  //       return;
  //     }

    
  //   if (!inputs.userPMDCID) {
  //       alert('Please fill PMDCID');
  //       return;
  //     }
  //   if (!inputs.userPassword) {
  //     alert('Please fill Password');
  //     return;
  //   }
  //   if (!inputs.ConfirmUserPassword) {
  //     alert('Please fill Password Again');
  //     return;
  //   }
  //   if (inputs.userPassword != inputs.ConfirmUserPassword) {
  //     alert('Passwords Does not match!!');
  //     return;
  //   }
    // Axios.post(`http://${api}/doctorIn_signup`, inputs)
    //     .then((res) => {
    //       if(!res.data.message) {
    //         setIsRegistraionSuccess(true)
    //       }
    //       else {
    //         alert(res.data.message)
    //       }
    //       console.log({res});
    //       // setemp_id1(res.data.insertId);
    //     })
    //     .catch((err) => {
    //       setErrortext(err.Error);
    //       console.log("This is error", JSON.stringify(err));
    //     });
    
    setDoctor({
      "name": inputs.name,
      "qualification": inputs.qualification,
      "experience": inputs.experience,
      "charges": inputs.charges,
      "speciality": inputs.speciality,
      "password":inputs.password
  })
  console.log({inputs})


  };

  return (
    <View style={{flex: 1, backgroundColor: 'blue',width:'100%',paddingTop:50}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView enabled>
        <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => handleChange('name', text)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => handleChange('charges', text)}
              underlineColorAndroid="#f000"
              placeholder="Enter charges"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => handleChange('qualification', text)}
              underlineColorAndroid="#f000"
              placeholder="Enter qualification"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => handleChange('experience', text)}
              underlineColorAndroid="#f000"
              placeholder="Enter experience"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
  
       
       
         
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) =>
                handleChange('speciality', text)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Speciality"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
            
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

        
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=>navigation.navigate('ViewDoctor',{doctor})}>
            <Text style={styles.buttonTextStyle}>View</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default DoctorSignup;
 
const styles = StyleSheet.create({
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
  
      width:'100%'
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    successTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
  });