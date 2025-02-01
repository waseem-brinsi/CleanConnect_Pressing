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
    const [profileImage, setProfileImage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("--selectionner--");
  
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  
    const handleSelect = (option) => {
      setSelected(option);
      setIsOpen(false);
    };
 

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

      



    const handleRegister = async () => {
      if (!name  ) {
        Alert.alert('Error', 'Please fill in all fields');
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
        <Icon_label icon={"Car"} title={"Type de véhicule "} />

        <TouchableOpacity style={styles.button} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.text}>{selected}</Text>
        </TouchableOpacity>

          {isOpen && (
            <View style={styles.dropdown}>
              {options.map((option, index) => (
                <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelect(option)}>
                  <Text style={styles.optionText}>{option}</Text>
  
                </TouchableOpacity>
              ))}
            </View>
          )}
          

        <View style={styles.inputContainer}>
          <Icon_label icon={"Car2"} title={"Marque / Modele"} />
        <TextInput
          style={styles.input}
          placeholder="Nom de l'entreprise"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />

      <Icon_label icon={"Car2"} title={"Numéro d'immatriculation"} />
        <TextInput
          style={styles.input}
          placeholder="Type de l'entreprise"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
      
      <Icon_label icon={"FileUpload"} title={"Assurance du véhicule"} />

      <View style={[{justifyContent:"center"}]}>
          <CancelButton icon={'FileUpload'} HandleCancel={handleFileUpload}  CancelText={'Importer'} ></CancelButton>
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
    button: {
      // backgroundColor: "#007bff",

      // borderRadius: 5,
      width: '100%',
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      padding: 10,
      backgroundColor: '#fff',
    },
    text: {
      color: "rgb(117, 117, 117)",
      fontSize: 16,
    },
    dropdown: {
      position: "absolute",
      top: 105,
      left:20,
      backgroundColor:"#fff",
      borderRadius: 5,
      elevation: 3,
      width: "100%",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      zIndex: 1000, 
    },
    option: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    optionText: {
      fontSize: 16,
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
