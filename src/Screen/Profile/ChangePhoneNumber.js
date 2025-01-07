import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity,Image, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import Icon_label from '../../components/Icon_label';
import HeaderComponent from '../../components/HeaderComponent';
import ConfirmeButton from '../../components/ConfirmeButton';


const { width,height } = Dimensions.get('window');

const ChangePhoneNumber = ({ navigation }) => {
  

  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  


  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to check if phone number is valid (digits only)
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };


  const handleConfirmation = async () => {
      if (!phoneNumber) {
        Alert.alert('Error', 'Please enter Phone');
        return;
      }

      if (!isValidPhoneNumber(phoneNumber)) {
        Alert.alert('Error', 'Phone number must be digits only');
        return;
      }
  
  
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/forgotPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({phoneNumber}),
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
  
        if (response.ok) {
          Alert.alert('Login', 'Login successful!', [
            { text: 'OK', onPress: ()=>navigation.navigate("Verification",{phoneNumber:phoneNumber,navTo:"ProfileSetting"}) },
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


  return (

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.BigLogo}>
        {React.createElement(icons['BigLogo1'])}
      </View>
    
<HeaderComponent title={"Paramétres du compte"}></HeaderComponent>
        <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Modifier le numéro de téléphone</Text>
          <Text style={styles.subtitle}>Nous enverros un code de vérification à 4 chiffres à ce numéro.</Text>
       
        </View>



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
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />

        </View>
        
        <ConfirmeButton HandleConfimation={handleConfirmation} ConfirmeText={"Envoyer le code par SMS"} ></ConfirmeButton>

        <View style={styles.column}>


            <View style={styles.connecter}>
              <Text style={styles.dejaText}>Déjà un compte ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.loginText}> Se connecter</Text>
              </TouchableOpacity>
            </View>

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





  

  column:{
    marginVertical:20,
    flexDirection:"column",
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center"
  },


  connecter:{
    flexDirection:"row",
    alignContent:"center",
    justifyContent:"center",
    marginTop:10,
  },
  dejaText: {
    fontSize: 14,
    fontWeight:"medium",
    color: 'grey',
    marginRight:2
  },
  loginText: {
    fontSize: 12,
    fontWeight:"bold",
    color: colors.primary,
  },

});

export default ChangePhoneNumber;
