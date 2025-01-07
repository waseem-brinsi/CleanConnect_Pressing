import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Dimensions } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import IconGoogle from '../../../assets/iconGoogle.svg';
import Icon_label from '../../components/Icon_label';


const { width,height } = Dimensions.get('window');


const ChangePassword = ({ navigation,route }) => {
  const {phoneNumber,verification_code} = route.params;

  const [new_password, setNew_password] = useState('');
  const [new_password_confirmation, setNew_password_confirmation] = useState('');

  const [loading, setLoading] = useState(false);




  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to check if phone number is valid (digits only)
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };

  const handleChangePassword = async () => {
    if ( !new_password || !new_password_confirmation || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }



    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Phone number must be digits only');
      return;
    }

    if (new_password !== new_password_confirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Handle registration logic here (e.g., call an API)

    
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          verification_code,
          new_password,
          new_password_confirmation
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again later.');
    } finally {
      setLoading(false);
    }

    
  };
  console.log(phoneNumber)
  console.log(verification_code)
    console.log(new_password)
      console.log(new_password_confirmation)

  return (
<SafeAreaView style={styles.safeArea}>
        <View style={styles.BigLogo}>
          {React.createElement(icons['BigLogo1'])}
        </View>
  
        <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Changer votre mot de passe</Text>
          <Text style={styles.subtitle}>Etes-vous prêt pour un nouveau départ!</Text>
        </View>
        

      <View style={styles.inputContainer}>


        <Icon_label icon={"Lock"} title={"Mot de Passe"} />

      <TextInput
        style={styles.input}
        placeholder="new password"
        value={new_password}
        onChangeText={setNew_password}
        secureTextEntry
        autoCapitalize="none"
      />

        <Icon_label icon={"Lock"} title={"Confirmer le Mot de Passe"} />

      <TextInput
        style={styles.input}
        placeholder="Confirm new Password"
        value={new_password_confirmation}
        onChangeText={setNew_password_confirmation}
        secureTextEntry
        autoCapitalize="none"
      />

     </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>S’inscrire</Text>
      </TouchableOpacity>


      <View style={styles.connecter}>
        <Text style={styles.dejaText}>Déjà un compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Verification')}>
          <Text style={styles.loginText}>Se connecter</Text>
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
  text: {
    fontSize: 14,
    fontWeight: 'medium',
    marginLeft  :10
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
    borderColor:colors.background,
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

export default ChangePassword;