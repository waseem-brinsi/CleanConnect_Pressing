import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,Dimensions, ScrollView } from 'react-native';
import { API_BASE_URL } from  '../../config/config'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';
import CancelButton from '../../components/CancelButton';
import ConfirmeButton from '../../components/ConfirmeButton';
import Icon_label from '../../components/Icon_label';
import * as DocumentPicker from 'expo-document-picker';


const { width,height } = Dimensions.get('window');


const EntrepriseInformation = ({ navigation }) => {

  const navigationGoBack = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [ profileImage, setProfileImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Ensure this matches your need
        copyToCacheDirectory: true, // Cache the file if needed
      });
      
      if (!result.canceled) {
        setSelectedFile(result.assets[0]); // Set the first asset in the assets array
      } else {
        setSelectedFile(null); // Reset if canceled
      }
    } catch (error) {
      console.error('File upload error:', error);
      setSelectedFile(null); // Reset on error
    }
  };


    const handleEditPhoto = async () => {
      const options = ['Take Photo', 'Choose from Library', 'Cancel'];
      const cancelButtonIndex = 2;
    
      Alert.alert('Update Profile Photo', 'Choose an option:', [
        {
          text: options[0],
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) setProfileImage(result.assets[0].uri);
          },
        },
        {
          text: options[1],
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Permission Denied',
                'Media library permission is required to choose a photo. Please enable it in settings.'
              );
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) setProfileImage(result.assets[0].uri);
          },
        },
        { text: options[2], style: 'cancel' },
      ]);
    };
    



  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to check if phone number is valid (digits only)
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };

  const handleRegister = async () => {
    if (!name || !phoneNumber  ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Phone number must be digits only');
      return;
    }



    // Handle registration logic here (e.g., call an API)

    
    setLoading(true);
    navigation.navigate('EntrepriseWorkingTime')

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

          {React.createElement(icons['percent2'],{width:58 ,height:58})}
            <View>
                <Text style={styles.title}>Informations Personnelles</Text>
                <Text style={styles.subtitle}> Suivant : Informations de l’entreprise</Text>
            </View>

        </View>
        <ScrollView>
        <View style={styles.container}>


        <View style={styles.section1}>
            
            <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>

            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                React.createElement(icons['Entreprise2'], { width: 80, height: 80})
                )}

                <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
                {React.createElement(icons['camera'], { width: 25, height: 25})}
                </TouchableOpacity>
            </View>
            </View>
        </View>
        
        

      <View style={styles.inputContainer}>
        <Icon_label icon={"Entreprise"} title={"Nom de l'entreprise"} />
      <TextInput
        style={styles.input}
        placeholder="Nom de l'entreprise"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />

    <Icon_label icon={"Entreprise"} title={"Type de l'entreprise"} />
      <TextInput
        style={styles.input}
        placeholder="Type de l'entreprise"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />

    <Icon_label icon={"Map2"} title={"Adresse de l'entreprise"} />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
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
    
    <Icon_label icon={"FileUpload"} title={"Patente de l’entreprise"} />
    <View style={[{justifyContent:"center"}]}>
        <CancelButton HandleCancel={handleFileUpload}  CancelText={'Importer  ▲'} ></CancelButton>
    </View>

       {selectedFile && (
        <View style={styles.fileInfo}>
          <Text style={{color:colors.primary}}>File Name: {selectedFile.name}</Text>
          <Text style={{color:colors.primary}}>File Size: {selectedFile.size} bytes</Text>
        </View>
      )}





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
    
  }

});

export default EntrepriseInformation;
