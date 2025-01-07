import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import icons from '../svg/svgLoader';
import colors from '../constants/colors';

const {width,height} = Dimensions.get('window')

const CancelScreen = ({title,description,buttonText,IconName,to,navigation}) => {

  const handleCancel = () => {
    navigation.navigate(`${to}`)
  };

  return (
    <View style={styles.container}>
        <View style={styles.section}>
                {React.createElement(icons[`${IconName}`], { width: 60, height: 60 })}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleCancel} >
                    <Text style={[styles.actionButtonText,{color:'#fff'}]}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
        </View>
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

  section: {
    width:width/1.1,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor:colors.background2
  },

  icon: {
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  description: {
    width:width/1.6,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,

  },

  
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background2,
  },

  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    flex: 1,
    
  },


  actionButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },

});

export default CancelScreen;
