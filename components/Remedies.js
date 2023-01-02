// import React, { useState, createRef, useEffect, useContext } from 'react';
// import Axios from "axios";
// import {
//     StyleSheet,
//     TextInput,
//     Button,
//     View,
//     Text,
//     ScrollView,
//     Image,
//     Keyboard,
//     TouchableOpacity,
//     KeyboardAvoidingView,
// } from 'react-native';
// import { ListItem, Avatar } from "@react-native-material/core";

// import { DataTable } from 'react-native-paper';
// import Constants from "expo-constants";
// const { manifest } = Constants;
// const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
//     ? manifest.debuggerHost.split(`:`).shift().concat(`:3001`)
//     : `api.example.com`;
// const AdminView = ({ navigation, route, disease }) => {
//     const [remedies, setRemedies] = useState({ 'eczema': ['bgf', 'bgf'], 'cc': ['bgfbgf'] });

//     return (
//         <>
//             {remedies[disease].map((d, i) => {
//                 return (
//                     <ListItem key={i} title={d} />
//                 )
//             })}

//         </>
// )};
// export default AdminView;


import React, {
    useState
} from "react"
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
import { ListItem, Avatar } from "@react-native-material/core";
const Remedies = ({ navigation, route, disease }) => {
    const [remedies, setRemedies] = useState({
        "Eczema": ["Change your laundry detergent or fabric softener.", "Take lukewarm (not hot) showers or baths", "Moisturize your skin twice a day."],
        "Acne": ["Cucumber Face Pack", "Benzoyl peroxide kills bacteria and removes extra oil.", "Don’t use oily makeup, sunscreen, or hair products.", "Don’t pick at or squeeze your pimples."],
        "Actinic Keratosis": ["Avoid exposure to sunlight during peak sunlight hours (10 a.m. to 2 p.m.).", "Wear clothing that covers arms and legs.", "Use sunscreen with sun protection factor (SPF) of 30 or higher, applying it at least 15 to 30 minutes before sun exposure."],
        "Herpes": ["Applying a cold compress to the affected area may help reduce swelling and pain."
            , "Applying a cream or ointment that contains a local anesthetic, such as lidocaine, may help numb the affected area and reduce pain."
            , "Taking warm baths may help soothe the skin and reduce discomfort."],
        "NailFungus": ["Keep your feet clean and dry.", "Change your shoes and socks every day.", "Over the counter antifungal creams or ointments. File or cut off any white markings on your nails. Soak your nails in water and dry off before you put on the medicated cream"],
        "Psoriasis": ["Apple cider vinegar: Apply a mixture of apple cider vinegar and water to your scalp a couple of times a week to relieve itching. Rinse it off afterward so it doesn't irritate your skin. Avoid this method if your scalp area is cracked or bleeding, as it may create a burning sensation.",
            "Oat bath: Grind up some oats and add them to lukewarm (not hot) bathwater for a skin-soothing soak. ",
            "Salt bath: There's another way to soak off scales. Pour Dead Sea or Epsom salts into your tub and relax for 15 to 20 minutes. Apply a moisturizer afterward."],
        "seborrheic keratoses": ["Apply a small amount of apple cider vinegar to the growth using a cotton swab. Repeat several times a day for a few weeks.",
            "Dilute tea tree oil with a carrier oil, such as coconut oil, and apply it to the growth several times a day for a few weeks.",
            "Apply aloe vera gel to the growth several times a day for a few weeks."],
        "Tinea": ["Crush a clove of garlic and apply it to the affected area. Cover with a bandage and leave on for several hours. Repeat several times a day for a few weeks."
            , "Mix turmeric with water to create a paste and apply it to the affected area. Leave it on for several hours before rinsing off. Repeat several times a day for a few weeks."
            , "Dilute apple cider vinegar with water and apply it to the affected area several times a day."]




    })
    // const disease_name=route.params.disease
    console.log("This is dis", remedies[disease])
    const disease_name = remedies[disease]
    //const [remedies, setRemedies] = useState({ 'eczema': ['bgf', 'bgf'], 'cc': ['bgfbgf'] });
    return (

        <View>

            {remedies[disease].map((d, i) => {
                return (
                    <ListItem key={i} title={d} />
                )
            })}

        </View>
    )
};
export default Remedies;