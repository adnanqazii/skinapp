import React, {useState, createRef} from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStyles } from '../AppStyles';
const WelcomeScreen = ({navigation,route}) => {
    return (
        
          <View style={styles.container}>
          <Text style={styles.title}>Welcome to E-sehat</Text>
          <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            title="Are you a patient?"
            onPress={() => navigation.navigate('PatientLogin')}>
          </Button>
         
       
          
          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            title="Are you a Doctor?"
            onPress={() => navigation.navigate('DoctorLogin')}>
            Sign Up
          </Button>

          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            title="Admin"
            onPress={() => navigation.navigate('AdminLogin')}>
            Sign Up
          </Button>
        </View>
       
       
      );
    }
    export default WelcomeScreen;

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 150,
        },
        logo: {
          width: 200,
          height: 200,
        },
        title: {
          fontSize: AppStyles.fontSize.title,
          fontWeight: 'bold',
          color: AppStyles.color.tint,
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
        },
        loginContainer: {
          width: AppStyles.buttonWidth.main,
          backgroundColor: AppStyles.color.tint,
          borderRadius: AppStyles.borderRadius.main,
          padding: 10,
          marginTop: 30,
        },
        loginText: {
          color: AppStyles.color.white,
        },
        signupContainer: {
          width: AppStyles.buttonWidth.main,
          backgroundColor: AppStyles.color.white,
          borderRadius: AppStyles.borderRadius.main,
          padding: 8,
          borderWidth: 1,
          borderColor: AppStyles.color.tint,
          marginTop: 15,
        },
        signupText: {
          color: AppStyles.color.tint,
        },
        spinner: {
          marginTop: 200,
        },
      });
      
    


