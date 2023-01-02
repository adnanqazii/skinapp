// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider
 
// import React in our code
import React, {useState} from 'react';
 
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
 
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
 
const App = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);
 
  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };
 
  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} />
        {/* <Text style={styles.introTextStyle}>
          {item.text}
        </Text> */}
        <Button
            // containerStyle={styles.loginContainer}
            // style={styles.loginText}
            title={item.text}
            onPress={() => navigation.navigate(`${item.link}`)}>
          </Button>
      </View>
    );
  };
 
  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip
              from any slide or Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          // onDone={onDone}
          // showSkipButton={true}
          // onSkip={onSkip}
        />
      )}
    </>
  );
};
 
export default App;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
 
const slides = [
  {
    key: 's1',
    text: 'Log in as Doctor',
    title: 'Want to treat patients?',
    image: {
      uri:
        'https://www.pngitem.com/pimgs/b/198-1985222_doctor-icon-png.png',
    },
    backgroundColor: '#20d2bb',
    link:'DoctorLogin'
  },
  {
    key: 's2',
    title: 'Want to book appointments?',
    text: 'Log in as patient',
    image: {
      uri:
        'https://cdn4.iconfinder.com/data/icons/medical-situations-flat-happy-hospital/512/Medical_diagnosis-512.png',
    },
    backgroundColor: '#febe29',
    link:'PatientLogin'
  },
  {
    key: 's3',
    title: 'Manage site?',
    text: 'Log in as Admin',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
    link:'AdminLogin'
  },
  
];
