import React, { useState } from 'react';
import { View, Text, TextInput, Modal,TouchableOpacity, StyleSheet, Alert,Image,Dimensions } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import Icon_label from '../../components/Icon_label';
import HeaderComponent from '../../components/HeaderComponent';
import ConfirmationModal from '../../components/ConfirmationModal';
import ConfirmeButton from '../../components/ConfirmeButton';
import CancelButton from '../../components/CancelButton';


const { width,height } = Dimensions.get('window');


const ChangePasswordProfile = ({ navigation,route }) => {
  const navigationGoBack = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [actuel_password, setActuel_password] = useState('');

  const [new_password, setNew_password] = useState('');
  const [new_password_confirmation, setNew_password_confirmation] = useState('');

  const [loading, setLoading] = useState(false);



  const handleChangePassword = async () => {
    if ( !new_password || !new_password_confirmation ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    if (new_password !== new_password_confirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }


    setModalVisible(true)
    // Handle registration logic here (e.g., call an API)

    
    // setLoading(true);

    // try {
    //   const response = await fetch(`${API_BASE_URL}/changePassword`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       // verification_code,
    //       // new_password,
    //       // new_password_confirmation
    //     }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     Alert.alert('Success', 'Registration successful!', [
    //       { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
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
    console.log(new_password)
      console.log(new_password_confirmation)

  return (
<SafeAreaView style={styles.safeArea}>
        <View style={styles.BigLogo}>
          {React.createElement(icons['BigLogo1'])}
        </View>

          <HeaderComponent title={"Paramétres du compte"}/>
        <View style={styles.container}>
        <View style={styles.topContainer}>

          <Text style={styles.title}>Changer le mot de passe</Text>
          <Text style={styles.subtitle}>Le mot de passe doit contenir au moins 8 caractères, incluant un chiffre ou un symbole.</Text>
        </View>
        

      <View style={styles.inputContainer}>

      <Icon_label icon={"Lock"} title={"Mot de passe actuel *"} />
      <TextInput
        style={styles.input}
        placeholder="actuel password"
        value={actuel_password}
        onChangeText={setActuel_password}
        secureTextEntry
        autoCapitalize="none"
      />


      <Icon_label icon={"Lock"} title={"Nouveau Mot de passe *"} />
      <TextInput
        style={styles.input}
        placeholder="new password"
        value={new_password}
        onChangeText={setNew_password}
        secureTextEntry
        autoCapitalize="none"
      />

      <Icon_label icon={"Lock"} title={"Confirmer le nouveau mot de passe *"} />
      <TextInput
        style={styles.input}
        placeholder="Confirm new Password"
        value={new_password_confirmation}
        onChangeText={setNew_password_confirmation}
        secureTextEntry
        autoCapitalize="none"
      />

     </View>


      <ConfirmeButton ConfirmeText={"S’inscrire"} HandleConfimation={handleChangePassword} />
      <CancelButton CancelText={"Annuler"} HandleCancel={() => navigationGoBack.goBack()} />
      

      <View style={styles.connecter}>
        <Text style={styles.dejaText}>Déjà un compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Verification')}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      </View>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <ConfirmationModal 
      navigation={navigation}
      title="Modifiction enregistrée"
      description="Votre mot de passe a été enregistrée avec succés!"
      buttonText="OK"
      IconName="PassModification"
      to="LoginScreen"
      ></ConfirmationModal>
      </Modal>

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

export default ChangePasswordProfile;