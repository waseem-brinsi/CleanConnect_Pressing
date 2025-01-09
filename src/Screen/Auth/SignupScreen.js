import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity,Image, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import IconGoogle from '../../../assets/iconGoogle.svg'
import Icon_label from '../../components/Icon_label';


const { width,height } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidPhoneNumber = (phoneNumber) => {
      // Regular expression to check if phone number is valid (digits only)
      const regex = /^\d+$/;
      return regex.test(phoneNumber);
    };
  
    const handleLogin = async () => {
      if (!phoneNumber) {
        Alert.alert('Error', 'Please enter both Phone');
        return;
      }

      if (!isValidPhoneNumber(phoneNumber)) {
        Alert.alert('Error', 'Phone number must be digits only');
        return;
      }
  
      navigation.navigate('Verification',{navTo:'AcountInformation'})

  
      // setLoading(true);
      // try {
      //   const response = await fetch(`${API_BASE_URL}/login`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ phoneNumber, password }),
      //   });
      //   console.log(response)
      //   const data = await response.json();
      //   console.log(data)
  
      //   if (response.ok) {
      //     Alert.alert('Login', 'Login successful!', [
      //       { text: 'OK', onPress: () => navigation.navigate('Home') },
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
          <Text style={styles.title}>Informations Personnelles</Text>
          <Text style={styles.subtitle}>Suivant : Informations de l’entreprise</Text>
        </View>
   
        <Icon_label icon={"Phone"} title={"Nom et Prénom"} />

        <View style={styles.PhoneNumberRow}>

          <View style={styles.PhoneNumber}>
            <Image source={require('../../../assets/TN.png')} style={styles.Image} />
            <Text style={styles.text}>+216</Text>
          </View>

            <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />

        </View>



          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>



          <View style={styles.containerLine}>
        <View style={styles.line} />
        <Text style={styles.textLine}>Ou</Text>
        <View style={styles.line} />
      </View>


    <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <View style={styles.icon}>
            <IconGoogle width={24} height={24} />

          </View>
          <Text style={styles.socialButtonText}>Connectez-vous avec Google</Text>
        </TouchableOpacity>
    </View>

      <View style={styles.connecter}>
        <Text style={styles.dejaText}>Pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.loginText}>S'inscrire</Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,  
  },
  topContainer:{
    marginBottom:20

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color:'grey',
    fontWeight: 'regular',
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
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 12,
    fontWeight:"regular",
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  
  containerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20, // Adjust the vertical margin as needed
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#8C8C8C', // Line color
  },
  textLine: {
    marginHorizontal: 10, // Space around the text
    fontSize: 16,
    color: '#555', // Text color
  },


  socialContainer: {
    width: '100%',
  },
  socialButton: {
    backgroundColor: '#fff', // Google blue
    padding: 15,
    borderWidth:1,
    borderColor: colors.background,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  connecter:{
    flexDirection:"row",
    alignContent:"center",
    justifyContent:"center"
  },
  dejaText: {
    fontSize: 12,
    fontWeight:"light",
    color: 'grey',
    marginRight:2
  },
  loginText: {
    fontSize: 12,
    fontWeight:"bold",
    color: colors.primary,
    textDecorationLine: 'underline',
  },

});

export default SignupScreen;
