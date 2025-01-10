import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Dimensions, ScrollView } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import CancelButton from '../../components/CancelButton';
import ConfirmeButton from '../../components/ConfirmeButton';
import Icon_label from '../../components/Icon_label';



const { width,height } = Dimensions.get('window');


const BankInformation = ({ navigation }) => {

  const navigationGoBack = useNavigation();
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const [isTeamChecked, setIsTeamChecked] = useState(false);
  const [isConditionChecked, setIsConditionChecked] = useState(false);

  const toggleTeamCheckbox = () => setIsTeamChecked(!isTeamChecked);
  const toggleConditionCheckbox = () => setIsConditionChecked(!isConditionChecked);





  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to check if phone number is valid (digits only)
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };

  const handleRegister = async () => {
    if (!name   ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }




    // Handle registration logic here (e.g., call an API)

    
    setLoading(true);
    navigation.navigate('Home')

    // try {
    //   console.log("try")
    //   const response = await fetch(`${API_BASE_URL}/register`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       name,
    //       password,
    //       password_confirmation,
    //       phoneNumber
    //     }),
    //   });

    //   const data = await response.json();
    //   console.log("try2")
    //   console.log(data)


    //   if (response.ok) {
    //     console.log("try3")

    //     Alert.alert('Success', 'Registration successful!', [
    //       { text: 'OK', onPress: () => navigation.navigate('Verification') },
    //     ]);
    //   } else {
    //     Alert.alert('Error', data.message || 'Something went wrong');
    //   }
    // } catch (error) {
    //   Alert.alert('Error', 'Network error. Please try again later.');
    // } finally {
    //   setLoading(false);
    // }

    
  };

  return (
<SafeAreaView style={styles.safeArea}>
  

        <View style={styles.topContainer}>

          {React.createElement(icons['percent4'],{width:58 ,height:58})}
            <View>
                <Text style={styles.title}>Informations Bancaires</Text>
            </View>

        </View>
        <ScrollView>
        <View style={styles.container}>
        
        

      <View style={styles.inputContainer}>
        <Icon_label icon={"Bank"} title={"Nom de la Banque"} />
      <TextInput
        style={styles.input}
        placeholder=""
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />

    <Icon_label icon={"User"} title={"Titulaire du Compte"} />
      <TextInput
        style={styles.input}
        placeholder=""
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />

    <Icon_label icon={"Rib"} title={"RIB"} />
      <TextInput
        style={styles.input}
        placeholder=""
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        keyboardType="decimal-pad"
      />

      <Icon_label icon={"File"} title={"Numéro de Compte Bancaire"} />
        <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="decimal-pad"
        />


     <View >
     <Text style={styles.textTerm}>Termes et conditions</Text>

       <View style={styles.checkboxContainer}>
         <TouchableOpacity onPress={toggleTeamCheckbox} style={styles.checkbox}>
           {isTeamChecked && <View style={styles.checkboxTick} />}
         </TouchableOpacity>
         <Text style={styles.label}>J'accepte les Termes et Conditions</Text>
       </View>


       <View style={styles.checkboxContainer}>
             <TouchableOpacity onPress={toggleConditionCheckbox} style={styles.checkbox}>
           {isConditionChecked && <View style={styles.checkboxTick} />}
         </TouchableOpacity>
         <Text style={styles.label}>J'accepte la Politique de Confidentialité</Text>
       </View>

     </View>  

     </View>



    <View style={[{flexDirection:"row",justifyContent:"space-between", marginTop:30}]}>
        <CancelButton HandleCancel={()=> navigationGoBack.goBack()} style={{width:width*0.4}} CancelText={'Retour'} ></CancelButton>
        <ConfirmeButton style={{width:width*0.4}} ConfirmeText={'S’inscrire'} HandleConfimation={handleRegister}></ConfirmeButton>
    </View>


    </View>

    </ScrollView>
    </SafeAreaView>

  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position:'relative',
    backgroundColor: colors.white,
  },
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,  
    marginBottom:50
  },
  topContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
    alignItems:"center",
    padding:20,
    backgroundColor:colors.background2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color:'grey',
    fontWeight: 'regular',
  },
  section1: {
    // backgroundColor: colors.background2,
    paddingVertical: 10,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor:colors.background2,
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: 15,
    padding: 4,
  },

  inputContainer: {
    // backgroundColor: "rgba(243, 251, 255, 1)",
    // // backgroundColor:"green",
  },
  PhoneNumberRow: {
    flexDirection:"row",
    width:width/1.5,
  },
  PhoneNumber: {
    flexDirection:"row",
    marginRight:18,
    width:80,
    height:50,
    borderRadius:8,
    borderColor:colors.background,
    borderWidth: 1,
    backgroundColor:"#fff",
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  },

  Image:{
    width:21,
    height:15
  },

  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    
  },
  RoleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:30,
    paddingRight:30
  },
  fileInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
    
  },
    checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius:4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 12,
    fontWeight:"bold"
  },
  textTerm:{
    fontSize:14,
    fontWeight:"bold",
    marginBottom:20
}
});

export default BankInformation;






// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const CustomCheckboxScreen = () => {
//   const [isTeamChecked, setIsTeamChecked] = useState(false);
//   const [isConditionChecked, setIsConditionChecked] = useState(false);

//   const toggleTeamCheckbox = () => setIsTeamChecked(!isTeamChecked);
//   const toggleConditionCheckbox = () => setIsConditionChecked(!isConditionChecked);

//   return (
//     <View style={styles.container}>
//       {/* Team Checkbox */}
//       <View style={styles.checkboxContainer}>
//         <TouchableOpacity onPress={toggleTeamCheckbox} style={styles.checkbox}>
//           {isTeamChecked && <View style={styles.checkboxTick} />}
//         </TouchableOpacity>
//         <Text style={styles.label}>Team</Text>
//       </View>

//       {/* Condition Checkbox */}
//       <View style={styles.checkboxContainer}>
//         <TouchableOpacity onPress={toggleConditionCheckbox} style={styles.checkbox}>
//           {isConditionChecked && <View style={styles.checkboxTick} />}
//         </TouchableOpacity>
//         <Text style={styles.label}>Condition</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     padding: 20,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderWidth: 2,
//     borderColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   checkboxTick: {
//     width: 12,
//     height: 12,
//     backgroundColor: '#000',
//   },
//   label: {
//     fontSize: 16,
//   },
// });

// export default CustomCheckboxScreen;
