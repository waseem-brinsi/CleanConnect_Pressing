import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import icons from '../../svg/svgLoader';
import colors from '../../constants/colors';
import ConfirmationModal from '../../components/ConfirmationModal';

const {width,height} = Dimensions.get('window')

const Thanks = ({navigation}) => {
 
 


  return (
    <View style={styles.container}>
      <ConfirmationModal 
      navigation={navigation}
      title="Demande envoyée"
      description="Votre demande a été envoyée avec succès. Un membre de notre équipe vous contacterez dans les prochaines 24h."
      buttonText="OK"
      IconName="MessageSend"
      to="Home"
      ></ConfirmationModal>
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
