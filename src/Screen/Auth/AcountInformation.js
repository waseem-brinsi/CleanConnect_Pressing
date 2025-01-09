import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Dimensions } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import CancelButton from '../../components/CancelButton';
import ConfirmeButton from '../../components/ConfirmeButton';
import Icon_label from '../../components/Icon_label';


const { width,height } = Dimensions.get('window');


const AcountInformation = ({ navigation }) => {

  const navigationGoBack = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);




  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to check if phone number is valid (digits only)
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };

  const handleRegister = async () => {
    if (!name || !phoneNumber || !password || !password_confirmation ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Phone number must be digits only');
      return;
    }

    if (password !== password_confirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Handle registration logic here (e.g., call an API)

    
    setLoading(true);
    navigation.navigate('EntrepriseInformation')
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
        <View style={styles.BigLogo}>
          {React.createElement(icons['BigLogo1'])}
        </View>
  
        <View style={styles.container}>
        <View style={styles.topContainer}>

          {React.createElement(icons['percent1'],{width:58 ,height:58})}
            <View>
                <Text style={styles.title}>Informations Personnelles</Text>
                <Text style={styles.subtitle}> Suivant : Informations de l’entreprise</Text>
            </View>

        </View>
        

      <View style={styles.inputContainer}>
        <Icon_label icon={"User"} title={"Nom et Prénom"} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />

      <Icon_label icon={"Phone"} title={"Numéro de Téléphone"} />
      <View style={styles.PhoneNumberRow}>
          <View style={styles.PhoneNumber}>
                <Image source={require('../../../assets/TN.png')} style={styles.Image} />
                <Text style={styles.text}>+216</Text>
              </View>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => {
          if (/^\d{0,8}$/.test(text)) {
            setPhoneNumber(text);
          }
        }}
        keyboardType="phone-pad"
        maxLength={8}
        autoCapitalize="none"
      />
      </View>

      <Icon_label icon={"Email"} title={"Email"} />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />

      <Icon_label icon={"Lock"} title={"Mot de Passe"} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />


      <Icon_label icon={"Lock"} title={"Confirmer le Mot de Passe"} />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={password_confirmation}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />


     </View>


    <View style={[{flexDirection:"row",justifyContent:"space-between", marginTop:30}]}>
        <CancelButton HandleCancel={()=> navigationGoBack.goBack()} style={{width:width*0.4}} CancelText={'Retour'} ></CancelButton>
        <ConfirmeButton style={{width:width*0.4}} ConfirmeText={'S’inscrire'} HandleConfimation={handleRegister}></ConfirmeButton>
    </View>


    </View>
    </SafeAreaView>

  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position:'relative',
    backgroundColor: colors.white,
  },
  BigLogo: {
    position:'absolute',
    // top:-100,
    // left:-100,
  },
  container: {
    
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,  
  },
  topContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
    alignItems:"center",
    paddingVertical:20
    // backgroundColor:"#F7F6FF"

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


});

export default AcountInformation;