import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import CancelScreen from '../../components/CancelScreen';

const {width,height} = Dimensions.get('window')

const Thanks = ({navigation}) => {
 
 


  return (
    <View style={styles.container}>
      <CancelScreen 
      navigation={navigation}
      title="Demande envoyée"
      description="Votre demande a été envoyée avec succès. Un membre de notre équipe vous contacterez dans les prochaines 24h."
      buttonText="OK"
      IconName="MessageSend"
      to="Home"
      ></CancelScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

});

export default Thanks;
