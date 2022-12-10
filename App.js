//https://blog.bitsrc.io/how-to-use-redux-hooks-in-a-react-native-app-login-logout-example-6dee84dee51b
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import PatientSignup from './components/PatientSignup';
import DoctorSignup from './components/DoctorSignup';
import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';
import PatientHome from './components/PatientHome';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import AdminView from './components/AdminView';
import WelcomeScreen from './components/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Appointment from './components/Appointment'
import AppointmentBooking from './components/AppointmentBooking';
import Intro from './components/Intro';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { DiseaseContext, PatientContext, DoctorContext } from './contexts';
import Drawer from './components/Drawerr'
//import AsyncStorage from '@react-native-community/async-storage'
export default function App() {
  console.log("App is working");
  const Stack = createStackNavigator();
  const PatientState = useState({})
  const DoctorState = useState({})
  const DiseaseState = useState({})
  return (


    <NavigationContainer>
      <PatientContext.Provider value={PatientState}>
        <DoctorContext.Provider value={DoctorState}>
          <DiseaseContext.Provider value={DiseaseState}>
            <Stack.Navigator initialRouteName="Intro">
            {/* <Stack.Screen name="Drawer" component={Drawer} /> */}

              <Stack.Screen name="Appointment" component={Appointment} />
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="DoctorSignup" component={DoctorSignup} />
              <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
              <Stack.Screen name="PatientLogin" component={PatientLogin} />
              <Stack.Screen name="PatientSignup" component={PatientSignup} />
              <Stack.Screen name="PatientHome" component={PatientHome} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AdminLogin" component={AdminLogin} />
              <Stack.Screen name="AdminView" component={AdminView} />
              <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} />
            </Stack.Navigator>
          </DiseaseContext.Provider>
        </DoctorContext.Provider>
      </PatientContext.Provider>

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
