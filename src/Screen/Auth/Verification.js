import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity,Image, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';


const { width,height } = Dimensions.get('window');

const Verification = ({ navigation,route }) => {
  const {navTo} = route.params
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    if (!code ) {
      Alert.alert('Error', 'Please Enter The Code');
      return;
    }



    
    setLoading(true);

    try {
      console.log("try")
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code
        }),
      });

      const data = await response.json();
      console.log("try2")
      console.log(data)


      if (response.ok) {
        console.log("try3")

        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: Switch_navigation(navTo)},
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
  console.log(navTo)
  const Switch_navigation = (navTo) => {
    switch (navTo) {
      case 'LoginScreen':
        navigation.navigate('LoginScreen');
        break;
      case 'ProfileSetting':
          navigation.navigate('ProfileSetting');
          break;
      default:
        console.log('Unknown navigation target:', navTo);
    }
  };


  return (

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.BigLogo}>
        {React.createElement(icons['BigLogo1'])}
      </View>
    

        <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Code de Vérification</Text>
          <Text style={styles.subtitle}>Un SMS contenant un code de 6 chiffres a été envoyé  à votre numéro de téléphone.</Text>
          <Text style={[styles.title,{fontSize: 12,}]}>Entrez le code ci-dessous</Text>
        </View>

        <TextInput
        style={styles.input}
        placeholder="Code Vérification "
        value={code}
        onChangeText={setCode}
        autoCapitalize="none"
      />
        



          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>

        <View style={styles.column}>

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.loginText}>Renvoyer le code</Text>
              </TouchableOpacity>

            <View style={styles.connecter}>
              <Text style={styles.dejaText}>Vous n'avez pas reçu le code ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}>
                <Text style={styles.loginText}>Contactez le support</Text>
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
    alignItems: 'center',
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
  row: {
    flexDirection:"row",
    marginBottom:15,

    // justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
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

export default Verification;
