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
const Profile = ({ navigation, route,patient }) => {
    console.log(route.params.patient)
    const {age,gender,id,name}=route.params.patient
    return (<View>
        <Text>Name: {name}</Text>
        <Text>Gender: {gender}</Text>
        <Text>Age: {age}</Text>
    </View>);
  };
  export default Profile;