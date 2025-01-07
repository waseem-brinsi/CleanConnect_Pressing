import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import icons from '../../svg/svgLoader';
import HeaderComponent from '../../components/HeaderComponent';
import colors from '../../constants/colors';
import HorizontalLine from '../../components/HorizontalLine';


items1 = [
  { id: '1',icon: 'Lock', title: 'Changer le Mot de Passe',  navigateTo:'ChangePasswordProfile'},
  { id: '2',icon: 'Phone', title: 'Modifier le numéro de téléphone',  navigateTo:'ChangePhoneNumber'},
]



const ProfileSetting = ({navigation}) => {

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
  
  
    return (
      <View style={styles.container}>
          <View style={styles.BigLogo}>
            {React.createElement(icons['BigLogo1'])}
          </View>
  
        <HeaderComponent title="Paramétres du Compte"></HeaderComponent>
        <View style={styles.section2}>
          <FlatList
                data={items1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={1}
          />
        </View>
      </View>
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
      backgroundColor: '#fff',
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
  
  export default ProfileSetting;
  