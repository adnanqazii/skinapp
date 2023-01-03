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
    Pressable,
  } from 'react-native';
const Profile = ({ navigation, route }) => {
    console.log(route.params.doctor)
    // const {age,gender,id,name}=route.params.patient
    const {charges,experience,id,name,qualification, speciality,password} =route.params.doctor
    return (<View>
        <Text>Name: {name}</Text>
        <Text>charges: {charges}</Text>
        <Text>experience: {experience}</Text>
        <Text>qualification: {qualification}</Text>
        <Text>speciality: {speciality}</Text>

    </View>);
  };
  export default Profile;