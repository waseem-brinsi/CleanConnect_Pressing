import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import colors from '../constants/colors';

const ConfirmeButton = ({HandleConfimation,ConfirmeText,style,style2 }) => {



  return (
    <View style={[styles.actionButtonsContainer,style]}>

            <TouchableOpacity style={[styles.actionButton,style2]} 
            onPress={HandleConfimation} >
                <Text style={styles.actionButtonText}>{ConfirmeText}</Text>
            </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({

  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding:5,
    marginHorizontal: 5,
    borderWidth:1,
    borderColor:"#fff"
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  
  
});

export default ConfirmeButton;
