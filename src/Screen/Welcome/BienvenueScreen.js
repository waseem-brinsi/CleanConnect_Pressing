import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import icons from '../../svg/svgLoader';


const { width } = Dimensions.get('window');

const BienvenueScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.BigLogo}>
        {React.createElement(icons['BigLogo'],{width:500 ,height:500})}
      </View>

      <View style={styles.container}>
      

      {React.createElement(icons['Logo'],{width:90 ,height:60 , marginBottom:20})}

      <Text style={styles.TitleText}>Bienvenue sur</Text>

      <Text style={[styles.TitleText,{fontSize: 32,}]}>CleanConnect Livreur</Text>
      {/* <Text style={[styles.TitleText,{fontSize: 24,}]}></Text> */}

      <View style={styles.Pressing}>
           {React.createElement(icons['Pressing'],{width:90 ,height:70})}
      </View>

  

      <Text style={styles.description}>
      Connectez-vous pour accéder à vos services de nettoyage ou créez un compte pour commencer.
      </Text>



      
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[styles.actionButton,
        {borderWidth:1}]} 
        onPress={()=>navigation.navigate('LoginScreen')} 
        >
           <Text style={styles.actionButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
        style={[styles.actionButton,
        { backgroundColor: colors.primary,borderColor:colors.white,borderWidth:1}]} 
        onPress={()=> navigation.navigate('SignupScreen')} 
        >
           <Text style={[styles.actionButtonText,{color:colors.white}]}>S’inscrire</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity  onPress={()=> navigation.navigate('Home')} >
           <Text style={[{color:colors.white}]}>Skip</Text>
      </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position:'relative',
    backgroundColor: colors.primary,
  },

  BigLogo: {
    position:'absolute',
    top:-100,
    left:-100,
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: "#fff",
    },
  TitleText: {
      fontSize: 24,
      color:"#fff",
      textAlign: 'center',
      fontWeight: 'bold',
    },
  Pressing: {
    marginTop:20
    },
  description: {
      fontSize: 14,
      color:"#fff",
      fontWeight: 'regular',
      textAlign: 'center',
      paddingHorizontal: 25,
      marginVertical:10,
      marginBottom: 30,
  
    },

 

  
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginBottom:10,

  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor:"#fff",
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
  },

  actionButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default BienvenueScreen;
