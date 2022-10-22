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
    Button
} from 'react-native';
import { useContext } from 'react';
import Axios from 'axios'
import { PatientContext } from '../contexts';
const Home = ({ navigation, route }) => {
    const [patient, setPatient] = useContext(PatientContext);
    const { doctor } = route.params
    console.log(patient)
    const getAppointment = () => {
        Axios.post("http://192.168.0.105:3001/get_appointment", {
            doctor_id: doctor.id,
            patient_id: patient.id,
            disease: "disease",
            timing: "timing"
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    console.log(patient)
    return (
        <View>
            <Text>
            Doctor Name: {doctor.name}
            Charges: Rs{doctor.charges}
            Timing: {doctor.timing}
            </Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={getAppointment}>
                <Text style={styles.buttonTextStyle}>Get Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
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
    }
})

export default Home;