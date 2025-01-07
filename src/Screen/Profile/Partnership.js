import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Dimensions,ScrollView  } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import Icon_label from '../../components/Icon_label';
import Title_Subtitle from '../../components/Title_Subtitle';
import HeaderComponent from '../../components/HeaderComponent';


const { width,height } = Dimensions.get('window');


const Partnership = ({ navigation }) => {
    const navigationGoBack = useNavigation();

  const [name, setName] = useState('');
  const [conpany, setConpany] = useState('');

  
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

 
  const [loading, setLoading] = useState(false);




  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };

  const handleMessage= async () => {
    if (!name || !phoneNumber || !email || !message ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Phone number must be digits only');
      return;
    }
    if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email.');
        return;
      }
    if (message.trim() === '') {
        Alert.alert('Validation Error', 'Message cannot be empty.');
        return;
    }


    // Handle registration logic here (e.g., call an API)

    
    setLoading(true);

    try {
      console.log("try")
      const response = await fetch(`${API_BASE_URL}/support_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          message  
        }),
      });

      const data = await response.json();
      console.log("try2")
      console.log(data)


      if (response.ok) {
        console.log("try3")

        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Thanks') },
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
        <HeaderComponent title={"Demande de partenariat"}></HeaderComponent>
    <ScrollView>
        <View style={styles.container}>


<Title_Subtitle title={"Devenir Partenaire ?"} subtitle={"Vous vendez des produits de nettoyage ou de soin pour textiles ? Contactez-nous pour proposer vos produits dans notre boutique.Vous serez appelez dans appeler dans les prochaines 24h du dépôt de votre demande."}/>

<View style={styles.inputContainer}>


    <Icon_label icon={"User"} title={"Nom et Prénom"} />
    <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
    />

    <Icon_label icon={"Conpany"} title={"Raison sociale / Nom de la société"} />
    <TextInput
        style={styles.input}
        placeholder="NA"
        value={conpany}
        onChangeText={setConpany}
        autoCapitalize="none"
    />


    <Icon_label icon={"Email"} title={"E-mail"} />
    <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
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

    <Icon_label icon={"TextArea"} title={"Votre Message"} />

    <TextInput
        style={styles.textArea}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        multiline
    />

</View>

<TouchableOpacity style={styles.button} onPress={ handleMessage}>
<Text style={styles.buttonText}>Envoyer</Text>
</TouchableOpacity>


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
    height:40,
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
    height: 40,
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
  textArea: {
    height: width/4,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
  },

});

export default Partnership;