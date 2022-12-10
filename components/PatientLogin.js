
import React, {useState, createRef,useEffect,useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button
} from 'react-native';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientContext } from '../contexts';

import Constants from "expo-constants";

const PatientLogin = ({navigation,route}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [login,setLogin]=useState(false);
  const [patient,setPatient]=useContext(PatientContext)
  const passwordInputRef = createRef();
  // console.log("Value1:",route.params.values.userEmail)
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("Email",userEmail );
      await AsyncStorage.setItem("Password",userPassword);
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }
  const readData = async () => {
    try {
     
      const userEmail = await AsyncStorage.getItem('Email');
      const userPassword = await AsyncStorage.getItem('Password');
      const inputs={userEmail,userPassword}
      const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
  : `api.example.com`;

      Axios.post(`http://${api}/patient_login`, inputs)
      .then((response) => {
        if (response.status === 200) {
          console.log("THIS ISSSSSS MUBEEEEN S RESPONSEEEEEE",response.data);
          setPatient(response.data)
          setLogin(true);
          navigation.navigate('PatientHome');
          console.log("Success1");
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        console.log("Wrong username /Password");
        setErrortext("Incorrect email or password");
      });
    } 
    catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  // useEffect(() => {
  //   readData();
  // }, []);
  
 
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    const inputs={userEmail,userPassword}
      console.log({inputs})
      const { manifest } = Constants;

      const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
        : `api.example.com`;
      // Axios.post(`http://${api}/patient_login`, inputs)
      // .then((response) => {
      //   if (response.status === 200) {
      //     console.log(response.data);
      //     const p = response.data[0];
      //     setPatient(response.data)
      //     setLogin(true);
      //     navigation.navigate('PatientHome');
      //     console.log("Success1");
      //   }
      //   else {
      //     console.log('vfbgf')
      //   }
      // })
      // .catch((err) => {
      //   console.log(JSON.stringify(err));
      //   console.log("Wrong username /Password");
      //   setErrortext("Incorrect email or password");
      // });
      setPatient(  {
        "name": "A",
        "age": 0,
        "gender": "gender",
        "id": 6
    })
          setLogin(true);
          navigation.navigate('PatientHome');
    
  };
 
  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              {/* <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              /> */}
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
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
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('PatientSignup')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default PatientLogin;
 
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    marginBottom: 25,
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
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
