import React, { useState } from 'react';
import { View, Text,Image, TextInput,Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import Icon_label from '../../components/Icon_label';
import ConfirmeButton from '../../components/ConfirmeButton';
import CancelButton from '../../components/CancelButton';



const { width,height } = Dimensions.get('window');

const InformationEntreprise = ({navigation}) => {


  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState('Nom');
  const [email, setEmail] = useState('E-mail');
const [phoneNumber, setPhoneNumber] = useState('');


  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = () => {
    // You can handle the save logic here
    console.log('Changes saved:', { name, email });
    setIsEditable(false);
  };

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
  
        // try {
        //   const response = await fetch(`${API_BASE_URL}/forgotPassword`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({phoneNumber}),
        //   });
        //   console.log(response)
        //   const data = await response.json();
        //   console.log(data)
    
        //   if (response.ok) {
        //     Alert.alert('Login', 'Login successful!', [
        //       { text: 'OK', onPress: ()=>navigation.navigate("Verification",{phoneNumber:phoneNumber,navTo:"ProfileSetting"}) },
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

        <HeaderComponent title="Information personnelles"  />

          <View style={styles.container}>
                <View style={styles.text_button}>
                    <Text style={styles.label}> Informations Personnelles</Text>
                    <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
                      <Text style={styles.editButtonText}>{isEditable ? 'Cancel' : 'Modifier'}</Text>
                    </TouchableOpacity>
                </View>

                <Icon_label icon={"Entreprise"} title={"Nom de l'entreprise"} />
                <TextInput
                  style={[styles.input, !isEditable && styles.disabledInput]}
                  value={name}
                  editable={isEditable}
                  onChangeText={setName}
                />

                <Icon_label icon={"Map2"} title={"Adresse de l'entreprise"} />
                <TextInput
                  style={[styles.input, !isEditable && styles.disabledInput]}
                  value={email}
                  editable={isEditable}
                  onChangeText={setEmail}
                  keyboardType="Adresse"
                />

                <Icon_label icon={"Email"} title={"Adresse Mail"} />
                <TextInput
                  style={[styles.input, !isEditable && styles.disabledInput]}
                  value={email}
                  editable={isEditable}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                
                <Icon_label icon={"Phone"} title={"Numéro de Téléphone"} />


                <View style={styles.PhoneNumberRow}>

                <View style={styles.PhoneNumber}>
                    <Image source={require('../../../assets/TN.png')} style={styles.Image} />
                    <Text style={styles.text}>+216</Text>
                </View>

                    <TextInput
                    style={[styles.inputPhone, !isEditable && styles.disabledInput]}    
                    placeholder="Phone Number"
                    value={phoneNumber}
                    editable={isEditable}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                />

                </View>

                {isEditable && (
                  <View>
                    <ConfirmeButton HandleConfimation={saveChanges} ConfirmeText={"Enregistrer les Modifications"}/>
                    <CancelButton HandleCancel={toggleEdit} CancelText={"Annuler"} />
                  </View>
                )}

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
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text_button:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:'center',
    alignItems:"center"
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: colors.background2,
    borderRadius: 50,
  },
  editButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white
  },
  inputPhone: {
    width: '100%',
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  disabledInput: {
    backgroundColor: colors.background,
    color: '#888',
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
      borderColor:colors.primary,
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

});

export default InformationEntreprise;
