import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert,FlatList } from 'react-native';
import icons from '../../svg/svgLoader';
import * as ImagePicker from 'expo-image-picker';
import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../constants/colors';
import HorizontalLine from '../../components/HorizontalLine';

items = [
  { id: '1',icon: 'UserCircle', title: 'Informations Personnelles',  navigateTo:'InformationAcount'},
  { id: '2',icon: 'Entreprise', title: 'Informations de l’Entreprise',  navigateTo:'InformationEntreprise'},
  { id: '3',icon: 'Calender', title: 'Horaires et Jours de Travail',  navigateTo:'WorkingTime'},
  { id: '4',icon: 'Partnership', title: 'Partenariat',  navigateTo:'Partnership'},
  { id: '5',icon: 'Setting', title: 'Paramétres du compte',  navigateTo:'ProfileSetting'},
  { id: '6',icon: 'Policy', title: 'Politique de confidentialité',  navigateTo:'Policy'},
  { id: '7',icon: 'Help', title: 'Centre d’aide',  navigateTo:'SupportScreen'},
  { id: '8',icon: 'Logout', title: 'Déconnexion',  navigateTo:'BienvenueScreen'},
]


const ProfileScreen = ({navigation}) => {


  const [ profileImage, setProfileImage] = useState('');

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
  

  const renderItem =({item})=>{

    return(
    <View>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate(item.navigateTo)}>
            <View style={[{flexDirection:"row",alignItems:"center"}]}>
            {React.createElement(icons[item.icon], { width: 25, height: 25})}
            <Text style={styles.optionText}>{item.title}</Text>
            </View>
            {React.createElement(icons['Arrowright'], { width: 16, height: 16})}
        </TouchableOpacity>

        <HorizontalLine  style={{ backgroundColor: colors.background2 }}></HorizontalLine>
    </View>
    )
  };

  
  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.section1}>
        
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
  
            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                React.createElement(icons['UserCircle'], { width: 80, height: 80})
              )}
  
              <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
                {React.createElement(icons['Pencil'], { width: 25, height: 25})}
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>LAUNDRY</Text>
            <Text style={styles.profilePhone}>+216 234 567 890</Text>
          </View>
        </View>
          
        );

      case 'section2':
        return (
          <View style={styles.section2}>

          <FlatList
                data={item.data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={1}
              />
          </View>
          
        );
      default:
        return null;
    }
  };

  const sections = [
    { id: '1', type: 'header' },
    { id: '2', type: 'section2', data: items},
  ];


  return (
    <View style={styles.container}>
      <HeaderComponent title="Mon Profil"   style={{ backgroundColor: colors.background2 }}></HeaderComponent>
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item.id}
      // contentContainerStyle={styles.container}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:50
  },
  section1: {
    backgroundColor: colors.background2,
    paddingVertical: 20,
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
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 16,
    color: colors.primary,
  },
  section2: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical: 15,
    
  },
  optionText: {
    marginLeft:15,
    fontSize: 13,
    fontWeight:"bold",
    color: '#333',
  },
});

export default ProfileScreen;