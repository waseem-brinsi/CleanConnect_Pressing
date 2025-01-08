import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import icons from '../../../svg/svgLoader';
import colors from '../../../constants/colors';
import ConfirmationModal from '../../../components/ConfirmationModal';


const {width,height} = Dimensions.get('window')

const Commande_annulee = ({navigation}) => {

  return (
    <View style={styles.container}>
        <ConfirmationModal 
      navigation={navigation}
      title="Votre commande a bien été annulée."
      description="Nous confirmons que votre demande d'annulation a été traitée avec succès."
      buttonText="Retour à la boutique"
      IconName="CancelComande"
      to="StoreScreen"
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

export default Commande_annulee;
